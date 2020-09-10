// users.test.js
import Axios from 'axios';
import * as Api from '../api';
import {ResponseError} from '../ErrorsTest';

jest.mock('Axios');

test('should fetch contacts data with given id', async () => {
  const data = {
    id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
    firstName: 'Bilbo',
    lastName: 'Baggins',
    age: 89,
    photo:
      'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
  };
  const resp = {data: data};
  Axios.get.mockResolvedValueOnce(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  const _data = await Api.fetchContact('93ad6070-c92b-11e8-b02f-cbfa15db428b');
  expect(_data.data).toEqual(data);
});

test('should update contact data with given id', async () => {
  const data = {
    message: 'Contact edited',
    data: {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Frodo',
      lastName: 'Baggins',
      age: 24,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
  };
  const resp = {data: data};
  Axios.put.mockResolvedValueOnce(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  const _data = await Api.editContact({age: 24, firstName: 'Frodo'});
  expect(_data.data).toEqual(data);
});

test('should error when update firstName length < 3', async () => {
  const errorResponse = {
    status: 400,
    // data: {
    //   statusCode: 400,
    //   error: 'Bad Request',
    //   message:
    //     'child "firstName" fails because ["firstName" length must be at least 3 characters long]',
    //   validation: {
    //     source: 'payload',
    //     keys: ['firstName'],
    //   },
    // },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.put.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.editContact({
      firstName: 'J',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when update firstName length > 30', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "firstName" fails because ["firstName" length must be less than or equal to 30 characters long]',
      validation: {
        source: 'payload',
        keys: ['firstName'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.put.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.editContact({
      firstName: 'Joooooooooooooooooooooooooooooohn',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when update firstName contain non-alphanumeric', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "firstName" fails because ["firstName" must only contain alpha-numeric characters]',
      validation: {
        source: 'payload',
        keys: ['firstName'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.put.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.editContact({
      firstName: 'Jooooooooooooooo ooooooooooooooohn',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when update lastName length < 3', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "lastName" fails because ["lastName" length must be at least 3 characters long]',
      validation: {
        source: 'payload',
        keys: ['lastName'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.put.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.editContact({
      lastName: 'D',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when update lastName length > 30', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "lastName" fails because ["lastName" length must be less than or equal to 30 characters long]',
      validation: {
        source: 'payload',
        keys: ['lastName'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.put.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.editContact({
      lastName: 'Doooooooooooooooooooooooooooooe',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when update lastName contain non-alpha-numeric', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "lastName" fails because ["lastName" must only contain alpha-numeric characters]',
      validation: {
        source: 'payload',
        keys: ['lastName'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.put.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.editContact({
      lastName: 'Doooooooooooooooo oooooooooooooe',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when update age is not number', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message: 'child "age" fails because ["age" must be a number]',
      validation: {
        source: 'payload',
        keys: ['age'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.put.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.editContact({
      age: 's',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when update age <= 0', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "age" fails because ["age" must be larger than or equal to 1]',
      validation: {
        source: 'payload',
        keys: ['age'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.put.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.editContact({
      age: 0,
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when update age > 100', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "age" fails because ["age" must be less than or equal to 200]',
      validation: {
        source: 'payload',
        keys: ['age'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.put.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.editContact({
      firstName: 'John',
      lastName: 'Doe',
      age: 999,
      photo: 'N/A',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should add new contact', async () => {
  const data = {
    message: 'Contact saved',
  };
  const resp = {data: data};
  Axios.post.mockResolvedValueOnce(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  const _data = await Api.addContact({
    firstName: 'John',
    lastName: 'Doe',
    age: 23,
    photo: 'N/A',
  });
  expect(_data.data).toEqual(data);
});

test('should error when update photo is empty string', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "photo" fails because ["photo" is not allowed to be empty]',
      validation: {
        source: 'payload',
        keys: ['photo'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.post.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.addContact({
      photo: '',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when firstName length < 3', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "firstName" fails because ["firstName" length must be at least 3 characters long]',
      validation: {
        source: 'payload',
        keys: ['firstName'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.post.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.addContact({
      firstName: 'J',
      lastName: 'Doe',
      age: 23,
      photo: 'N/A',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when firstName length > 30', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "firstName" fails because ["firstName" length must be less than or equal to 30 characters long]',
      validation: {
        source: 'payload',
        keys: ['firstName'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.post.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.addContact({
      firstName: 'Joooooooooooooooooooooooooooooohn',
      lastName: 'Doe',
      age: 23,
      photo: 'N/A',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when firstName contain non-alphanumeric', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "firstName" fails because ["firstName" must only contain alpha-numeric characters]',
      validation: {
        source: 'payload',
        keys: ['firstName'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.post.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.addContact({
      firstName: 'Jooooooooooooooo ooooooooooooooohn',
      lastName: 'Doe',
      age: 23,
      photo: 'N/A',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when lastName length < 3', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "lastName" fails because ["lastName" length must be at least 3 characters long]',
      validation: {
        source: 'payload',
        keys: ['lastName'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.post.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.addContact({
      firstName: 'John',
      lastName: 'D',
      age: 23,
      photo: 'N/A',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when lastName length > 30', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "lastName" fails because ["lastName" length must be less than or equal to 30 characters long]',
      validation: {
        source: 'payload',
        keys: ['lastName'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.post.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.addContact({
      firstName: 'John',
      lastName: 'Doooooooooooooooooooooooooooooe',
      age: 23,
      photo: 'N/A',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when lastName contain non-alpha-numeric', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "lastName" fails because ["lastName" must only contain alpha-numeric characters]',
      validation: {
        source: 'payload',
        keys: ['lastName'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.post.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.addContact({
      firstName: 'John',
      lastName: 'Doooooooooooooooo oooooooooooooe',
      age: 23,
      photo: 'N/A',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when age is not number', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message: 'child "age" fails because ["age" must be a number]',
      validation: {
        source: 'payload',
        keys: ['age'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.post.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.addContact({
      firstName: 'John',
      lastName: 'Doe',
      age: 's',
      photo: 'N/A',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when age <= 0', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "age" fails because ["age" must be larger than or equal to 1]',
      validation: {
        source: 'payload',
        keys: ['age'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.post.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.addContact({
      firstName: 'John',
      lastName: 'Doe',
      age: 0,
      photo: 'N/A',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when age > 200', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "age" fails because ["age" must be less than or equal to 200]',
      validation: {
        source: 'payload',
        keys: ['age'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.post.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.addContact({
      firstName: 'John',
      lastName: 'Doe',
      age: 999,
      photo: 'N/A',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

test('should error when photo is empty string', async () => {
  const errorResponse = {
    status: 400,
    data: {
      statusCode: 400,
      error: 'Bad Request',
      message:
        'child "photo" fails because ["photo" is not allowed to be empty]',
      validation: {
        source: 'payload',
        keys: ['photo'],
      },
    },
  };

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  Axios.post.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.addContact({
      firstName: 'John',
      lastName: 'Doe',
      age: 17,
      photo: '',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});

// Error at backend cannot test it
// Sometimes always giving contact unavailable whevever want to delete
test('should delete contact with given id', async () => {
  const data = {
    message: 'contact deleted',
  };
  const resp = {data: data};
  Axios.delete.mockResolvedValueOnce(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  const _data = await Api.deleteContact('93ad6070-c92b-11e8-b02f-cbfa15db428b');
  expect(_data.data).toEqual(data);
});

test('should throw error when delete no data', async () => {
  const errorResponse = {
    data: {
      message: 'contact unavailable',
    },
    status: 400,
  };
  Axios.delete.mockImplementationOnce(() =>
    Promise.reject(new ResponseError(errorResponse)),
  );

  await expect(
    Api.deleteContact({
      id: '123',
    }),
  ).rejects.toEqual(new ResponseError(errorResponse));
});
