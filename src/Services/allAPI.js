import { commonAPI } from './CommonAPI'
import { baseURL } from './baseURL'

// Register API
export const registerAPI = async (user) => {
    return await commonAPI("post", `${baseURL}/register`, user, "")
}
//Login API
export const loginAPI = async (user) => {
    return await commonAPI("post", `${baseURL}/login`, user, "")
}

// Add Book API
export const addbookAPI = async (bookData, reqHeader) => {
    return await commonAPI("post", `${baseURL}/books/add`, bookData, reqHeader)
}

// View All Books
export const viewallbooksAPI = async (searchKey, reqHeader) => {
    return await commonAPI("get", `${baseURL}/books?search=${searchKey}`, "", reqHeader)
}

// view Book by ID

export const viewbookbyidAPI = async (id, reqHeader) => {
    return await commonAPI("get", `${baseURL}/books/view/${id}`, "", reqHeader)
}

//Edit book
export const updatebookAPI = async (id, book, reqHeader) => {
    return await commonAPI("put", `${baseURL}/books/edit/${id}`, book, reqHeader)
}

// Delete Book
export const deleteBookAPI = async (id, reqHeader) => {
    return await commonAPI("delete", `${baseURL}/books/delete`, { id }, reqHeader)
}

