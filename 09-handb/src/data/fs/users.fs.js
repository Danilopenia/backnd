import fs from "fs";
import crypto from "crypto";

class UsersManager{
    static #users


   
    init() {
      try{
        const exists = fs.existsSync(this.path);
        if (!exists) {
          const data = JSON.stringify([],null,2 );
          fs.writeFileSync(this.path, data);
        } else {
          this.users= JSON.parse(fs.readFileSync(this.path, "utf-8"));
        }
      }catch(error){
        return error.message;
      }
      } constructor(path){
        this.path = path;
        this.users = [];
        this.init();
    }
      async createUser(data) {
        try {
          if (!data.name || !data.lastname) {
            throw new Error("Please, insert name & lastname");
            //VA A ACTIVAR EL CATCH (MANEJADOR DE ERRORES)
          }  
        
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        lastname: data.lastname,
        gmail: data.gmail,
        date: data.date || new Date(),
      };
      this.users.push(user);
      const jsonData = JSON.stringify(this.users,null,2)
        await fs.promises.writeFile(this.path, jsonData);
        console.log("create"+ user.id);
        return user.id;
    }catch(error){
      console.log(error.message);
      return error.message
    }}
getUser() {
    try {
    
     if (this.users.length===0) {
       throw new Error("they arent users");
     }else{
       return this.users;
     }
     
    } catch (error) {
     return error.message
    }
   }

 getUserById(id) {
try {
  const one = this.users.find((each) => each.id === id);
   if (!one) { 
    throw new Error ("ERROR the user with id "+id+" doesnt exist");
   }else{
    return one;
   }
  
  } catch (error) {
  return error.message;
}
}
async removeUserById(id) {
  try {
    let one = this.users.find((each) => each.id === id);
    if (!one) {
      throw new Error("There isn't any user with id=" + id);
    } else {
      this.users = this.users.filter((each) => each.id !== id);
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("deleted " + id);
      return id;
    }
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}
}

const user = new UsersManager("./src/data/fs/files/users.json");
/*products.getProducts();
user.createUser({ title: "hp1", price: 100 });
user.createUser({ title: "hp2", price: 100 });
user.getUser();
user.getUserById(1);*/
const users = new UsersManager("./src/data/fs/files/users.json");
export default users
