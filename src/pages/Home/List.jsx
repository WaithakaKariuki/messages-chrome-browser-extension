/*global chrome*/
import { memo, useState, useEffect, Suspense, lazy, useCallback } from 'react'
import Error from '../../components/Error.jsx'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import Loading from '../../components/Loading.jsx';
const Message = lazy(() => import('./Message.jsx'));

const List = memo(function List({messageState}) {
  const [messages, setMessages] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    
    const fetchDataAndStore = async () => {
      try {
        // Check if chrome.storage.local is available
        if (typeof chrome === "undefined" || !chrome.storage || !chrome.storage.local) {
          throw new Error('chrome.storage.local is not available in this context.');
        }

        // Retrieve data from chrome.storage.local
        chrome.storage.local.get("apiData", (result) => {
          setMessages(result.apiData);  // Update React state
        });
  
        // Fetch data from API
        const response = await fetch("http://localhost:3000/messages");
        const data = await response.json();
  
        // Save data to chrome.storage.local
        await chrome.storage.local.set({ "apiData": data });
        console.log('Data saved to chrome.storage:', data);
  
        // Retrieve data from chrome.storage.local
        chrome.storage.local.get("apiData", (result) => {
          const updatedMessages = data.map((message) => ({
            ...message,
            value: result[message.id] || "",  // Use value from storage if available
          }));
          setMessages(updatedMessages);  // Update React state
        });
        // setMessages(data)
      } catch (error) {
        console.error('Error fetching or saving data:', error);
        setErrors(error);
      }
    };
  
    fetchDataAndStore();
  }, []);

  //update the messages
  const handleUpdateMessage = useCallback((updatedMessage)=>{
    const updateMessages = messages.map((message) => {
      if (message.id === updatedMessage.id) {
        return updatedMessage;
      } else {
        return message;
      }
    });
    chrome.storage.local.set({ "apiData": updateMessages });
    setMessages(updateMessages)
  },[])

  const transformMessages = useCallback(()=>{
    let sortedMessages = messages;
  
    if (messageState.sort === "priority") {
      sortedMessages = sortedMessages.filter((message) => message.priority === "high");
    }
    if (messageState.sort  === "default") {
      sortedMessages = sortedMessages.sort((a, b) => b.id - a.id);
    }
    if (messageState.sort  === "unread") {
      sortedMessages = sortedMessages.filter((message) => message.read === false);
    }
    if (messageState.search) {
      sortedMessages = sortedMessages.filter((message) =>
        message.content?
        message.content.toLowerCase().includes(messageState.search):message
      );
    }
    return sortedMessages
  
  },[messages,messageState])

  return (
    <div className="overflow-hidden bg-white dark:bg-slate-800 shadow-lg sm:rounded-md">   
        <dl className="divide-y divide-gray-200 dark:divide-gray-100">          
            {transformMessages().map((message) => (
              <Suspense fallback={<Loading />}> 
                <Message key={message.id} message={message} onUpdateMessage={handleUpdateMessage} />
              </Suspense>
            ))}          
        </dl>            
        {
        errors.length>=1 &&
        (<Error errors={errors} />)
        }
        {
          transformMessages().length<1 &&
          (
            <div className="rounded-md bg-blue-50 dark:bg-blue-900 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <InformationCircleIcon className="h-5 w-5 text-blue-400 dark:text-blue-100" aria-hidden="true" />
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-blue-700 dark:text-blue-100">No messages found!</p>
              </div>
            </div>
          </div>
          )
        }
    </div>
  )
})
export default List