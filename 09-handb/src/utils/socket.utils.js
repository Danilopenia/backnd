import { socketServer } from "../../server.js";
import users from "../data/fs/users.fs.js";
import propsUsersUtils from "./props.Users.utils.js";



export default (socket) => {
    console.log("connected id:" + socket.id);
     socket.emit("users", users.getUser());
       socket.on("newUser", async(data)=>{ 
        try {
           propsUsersUtils(data);
           await users.createUser(data)
           socketServer.emit("products", users.getUser());
        } catch (error) {
            console.log(error);
        }
    });}
    /*socket.emit("all",messages);
    socket.on("new chat", data=>{
        messages.push(data)
        socketServer.emit("all", messages)
    });
}*/