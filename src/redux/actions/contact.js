export const SET_CONTACT_LIST = 'SET_CONTACT_LIST';
export const ADD_NEW_CONTACT = 'ADD_NEW_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';

/**
 * Set contact list
 * @param {Object} payload
 * @param {any[]} payload.data List of contact
 */
export const setContactList = (payload) => ({
  type: SET_CONTACT_LIST,
  payload,
});

/**
 * Add new contact
 * @param {Object} payload
 * @param {string} payload.id - id of new contact
 * @param {string} payload.firstName - firstName of new contact
 * @param {string} payload.lastName - lastName of new contact
 * @param {number} payload.age - age of new contact
 * @param {string} payload.photo - url of photo of new contact or N/A if none
 */
export const addNewContact = (payload) => ({
  type: ADD_NEW_CONTACT,
  payload,
});

/**
 * Update contact
 * @param {Object} payload
 * @param {string} payload.id - id of existing contact
 * @param {string} payload.firstName - firstName of existing contact
 * @param {string} payload.lastName - lastName of existing contact
 * @param {number} payload.age - age of existing contact
 * @param {string} payload.photo - url of photo of existing contact or N/A if none
 */
export const updateContact = (payload) => ({
  type: UPDATE_CONTACT,
  payload,
});

/**
 * Delete contact
 * @param {Object} payload
 * @param {string} payload.id Id's of contact that want to be deleted
 */
export const deleteContact = (payload) => ({
  type: DELETE_CONTACT,
  payload,
});
