import fs from "fs/promises";
import path from "path";
import { nanoid } from 'nanoid'
const contactsPath  = path.resolve("db","contacts.json")
// const contactsPath  = path.resolve("../db","contacts.json") //with this path does not work for me
// const contactsPath  = path.resolve("../goit-node-rest-api-1", "db","contacts.json")  //with this path work for me
console.log("myPath :" , contactsPath);

const updateAllContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts,null,2))

export async function list() {
  const data = await fs.readFile(contactsPath, "utf-8")
  return JSON.parse(data)
}

export async function get(contactId) {
  const listAllContacts = await list()
  const contactsById = listAllContacts.find(el=> el.id === contactId)
 
  return contactsById || null ;
}

export async function remove(contactId) {
  const listAllContacts = await list()
  const indexforDelete = listAllContacts.findIndex( el => el.id===contactId)
  
if(indexforDelete === -1){
  return null;
}
const [result] = listAllContacts.splice(indexforDelete, 1)
await fs.writeFile(contactsPath, JSON.stringify(listAllContacts , null , 1));
return result
  
}

 export async function add(data) {
  const listAllContacts = await list()
  const newContact = {
    id:nanoid(),
    ...data
  };
  listAllContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(listAllContacts , null , 1));
  return newContact;
}


export async function update(id, data) {
 
  const listAllContacts = await list()
  const indexforUpdate = listAllContacts.findIndex( el => el.id===id)
 
if(indexforUpdate === -1){
  return null;
}
listAllContacts[indexforUpdate]={...listAllContacts[indexforUpdate],...data}
await updateAllContacts(listAllContacts)

return listAllContacts[indexforUpdate]
  
}