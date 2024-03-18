import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js"
import { createContactSchema , updateContactSchema } from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res,next) => {
 try {
  const result = await contactsService.list()
  res.json(result)
  
 }
  catch (error) {
   next(error)
 }
};

export const getOneContact = async (req, res , next) => {
  try {
    const {id} = req.params;
    const result = await contactsService.get(id)
    
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
        }
    res.json(result)
   
    
   }
    catch (error) {
     next(error)
   }
  };



export const deleteContact = async (req, res, next) => {
  try {
    const {id}= req.params
    const result = await contactsService.remove(id)
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json({
          message: "Delete success"
      });
  }
   catch (error) {
    next(error)
  }
};

export const createContact = async (req, res, next) => {
  try {
    const {error} = createContactSchema.validate(req.body)
    if(error) {
      throw HttpError(400, error.message);
  }
    const result = await contactsService.add(req.body)
    res.status(201).json(result)
    
  } catch (error) {
    next(error)
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const {error} = updateContactSchema.validate(req.body)
    if(error) {
      throw HttpError(400, error.message);
  }

    const {id} = req.params;
    const result = await contactsService.update(id, req.body)
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
        }
    res.json(result)
    
  } catch (error) {
    next(error)
    
  }
};
