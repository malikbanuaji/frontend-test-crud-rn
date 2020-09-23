import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import PhotoModal from '../PhotoModal';

test('renders correctly without photo', () => {
  const tree = render(<PhotoModal hasPhoto={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with photo', () => {
  const tree = render(<PhotoModal hasPhoto={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('handle press correctly', () => {
  const mockOnPressDelete = jest.fn();
  const mockOnPressTakePhoto = jest.fn();
  const mockOnPressSelectGallery = jest.fn();
  const mockOnPressAbort = jest.fn();
  const {getByTestId} = render(
    <PhotoModal
      hasPhoto={true}
      onPressDelete={mockOnPressDelete}
      onPressCamera={mockOnPressTakePhoto}
      onPressGallery={mockOnPressSelectGallery}
      onPressAbort={mockOnPressAbort}
    />,
  );
  const deleteButton = getByTestId('photo-modal-delete-photo');
  fireEvent.press(deleteButton);
  expect(mockOnPressDelete).toBeCalled();

  const takePhotoButton = getByTestId('photo-modal-take-photo');
  fireEvent.press(takePhotoButton);
  expect(mockOnPressTakePhoto).toBeCalled();

  const selectGalleryButton = getByTestId('photo-modal-select-gallery');
  fireEvent.press(selectGalleryButton);
  expect(mockOnPressSelectGallery).toBeCalled();

  const abortButton = getByTestId('photo-modal-abort');
  fireEvent.press(abortButton);
  expect(mockOnPressAbort).toBeCalled();
});
