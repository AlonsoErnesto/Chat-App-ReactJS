import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import { AppBar, Toolbar,Avatar, Typography, Box, TextField, Stack } from '@mui/material';
import MessageCard from './MessageCard';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_MSG } from '../graphql/queries';
import SendIcon from '@mui/icons-material/Send';
import { SEND_MSG } from '../graphql/mutations';
import { MSG_SUB } from '../graphql/subscriptions';

const ChatScreen = () => {
   const { id, name } = useParams();
   const [text, setText] = useState("");
   const [messages, setMessages] = useState([]);
   const { data , loading, error} = useQuery(GET_MSG,{
      variables : {
         receiverId : +id
      },
      onCompleted (data){
         setMessages(data.messagesByUser);
      }
   })
   const [ sendMessage ] = useMutation(SEND_MSG,{
      onCompleted(data){
         setMessages((prevMessages)=>[...prevMessages, data.createMessage])
      }
   });
   const { data:subData} = useSubscription(MSG_SUB,{
      onSubscriptionData(data){
         setMessages((prevMessages)=>[...prevMessages,data.messageAdded])
      }
   });
   return (
      <Box
         flexGrow={1}
      >
         <AppBar position="static" sx={{backgroundColor:"white",boxShadow:0}}>
            <Toolbar>
               <Avatar
                  src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
                  sx={{width:"32px",height:"32px",marginRight:'12px'}}
               />
               <Typography variant='h6' color="black" >{name}</Typography>
            </Toolbar>
         </AppBar>
         <Box backgroundColor="#f5f5f5" height="81vh" padding="10px" sx={{overflowY:"auto"}}>
            {/* <MessageCard text="Hola" date="12/12/12" direction="end"/> */}
            {
               loading ? <Typography>Loading Chats ...</Typography> :
               messages.map(msg => {
                  return <MessageCard key={msg.createdAt} text={msg.text} date={msg.createdAt} direction={msg.receiverId == +id ? "end" : "start"}/>
               })
            }
         </Box>
         <Stack direction="row">
            <TextField
               placeholder='Messsage'
               variant='standard'
               fullWidth
               multiline
               rows={2}
               value={text}
               onChange={e=>setText(e.target.value)}
            />
            <SendIcon fontSize="large" onClick={()=>{
               sendMessage({
                  variables : {
                     receiverId : +id,
                     text
                  }
               })
            }}/>
         </Stack>
      </Box>
   );
};

export default ChatScreen;