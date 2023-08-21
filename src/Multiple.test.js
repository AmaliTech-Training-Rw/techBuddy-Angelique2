import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
import { AuthContext } from './AuthProvider';
import Multiple from './Multiple';

describe('Multiple Component', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('renders login form when user is not authenticated', () => {
    render(
      <AuthContext.Provider value={{ user: null }}>
        <Multiple />
      </AuthContext.Provider>
    );

    const loginForm = screen.getByRole('form', { name: 'Login' });
    expect(loginForm).toBeInTheDocument();
  });

  it('renders upload form when user is authenticated', () => {
    render(
      <AuthContext.Provider value={{ user: { id: 1, email: 'uwangela12@gmail.com'} }}>
        <Multiple />
      </AuthContext.Provider>
    );

    const uploadForm = screen.getByRole('form', { name: 'Image Upload' });
    expect(uploadForm).toBeInTheDocument();
  });

  it('handles image upload', async () => {
    // Mock successful image upload
    mockAxios.onPost('https://api.cloudinary.com/v1_1/dqtlfgnmh/image/upload').reply(200, {
      secure_url: 'mocked-image-url',
    });

    render(
      <AuthContext.Provider value={{ user: { id: 1, email: 'uwangela12@gmail.com' } }}>
        <Multiple />
      </AuthContext.Provider>
    );

    const fileInput = screen.getByLabelText('Image Upload');
    fireEvent.change(fileInput, { target: { files: [new File(['mock-image'], 'image.png', { type: 'image/png' })] } });

    const uploadButton = screen.getByText('Upload Images');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      const uploadedImage = screen.getByAltText('Uploaded Image');
      expect(uploadedImage).toBeInTheDocument();
    });
  });

});
