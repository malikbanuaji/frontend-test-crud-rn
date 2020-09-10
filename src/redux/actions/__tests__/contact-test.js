import * as actions from '../../actions/contact';

describe('actions', () => {
  it('should override contact list', () => {
    const list = [
      {
        id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
        firstName: 'Bilbo',
        lastName: 'Baggins',
        age: 89,
        photo:
          'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
      },
    ];
    const expectedAction = {
      type: actions.SET_CONTACT_LIST,
      payload: {
        data: list,
      },
    };
    expect(actions.setContactList({data: list})).toEqual(expectedAction);
  });
  it('should update contact list with given id', () => {
    const payload = {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 89,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    };

    const expectedAction = {
      type: actions.UPDATE_CONTACT,
      payload: {
        id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
        firstName: 'Bilbo',
        lastName: 'Baggins',
        age: 89,
        photo:
          'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
      },
    };
    expect(actions.updateContact(payload)).toEqual(expectedAction);
  });
  it('should delete one of contact list with given id', () => {
    const payload = {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
    };

    const expectedAction = {
      type: actions.DELETE_CONTACT,
      payload: {
        id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      },
    };
    expect(actions.deleteContact(payload)).toEqual(expectedAction);
  });
  it('should add new of contact list', () => {
    const payload = {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 89,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    };

    const expectedAction = {
      type: actions.ADD_NEW_CONTACT,
      payload: {
        id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
        firstName: 'Bilbo',
        lastName: 'Baggins',
        age: 89,
        photo:
          'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
      },
    };
    expect(actions.addNewContact(payload)).toEqual(expectedAction);
  });
});
