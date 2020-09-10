import reducer from '../../reducer/contact';
import * as actions from '../../actions/contact';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      data: [],
    });
  });

  it('should handle SET_CONTACT_LIST', () => {
    expect(
      reducer(
        {data: []},
        {
          type: actions.SET_CONTACT_LIST,
          payload: {
            data: [
              {
                id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
                firstName: 'Bilbo',
                lastName: 'Baggins',
                age: 89,
                photo:
                  'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
              },
            ],
          },
        },
      ),
    ).toEqual({
      data: [
        {
          id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
          firstName: 'Bilbo',
          lastName: 'Baggins',
          age: 89,
          photo:
            'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
        },
      ],
    });
  });

  it('should handle UPDATE_CONTACT', () => {
    expect(
      reducer(
        {
          data: [
            {
              id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
              firstName: 'Bilbo',
              lastName: 'Baggins',
              age: 22,
              photo:
                'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
            },
          ],
        },
        {
          type: actions.UPDATE_CONTACT,
          payload: {
            id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
            firstName: 'Frodo',
            lastName: 'Slay',
            age: 12,
            photo: 'N/A',
          },
        },
      ),
    ).toEqual({
      data: [
        {
          id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
          firstName: 'Frodo',
          lastName: 'Slay',
          age: 12,
          photo: 'N/A',
        },
      ],
    });
  });

  it('should handle DELETE_CONTACT', () => {
    expect(
      reducer(
        {
          data: [
            {
              id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
              firstName: 'Bilbo',
              lastName: 'Baggins',
              age: 22,
              photo:
                'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
            },
          ],
        },
        {
          type: actions.DELETE_CONTACT,
          payload: {
            id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
          },
        },
      ),
    ).toEqual({
      data: [],
    });
  });
});
