import axios from 'axios';

const memberApiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

async function fetchMemberPhotos() {
  const response = await memberApiClient.get('/member/1/photos');
  if (response.status) {
    return response.data
  }
  return null
}

async function addMemberPhotos(imageUrl: string) {
  const response = await memberApiClient.post('/member/1/photos', {
    id: Math.floor(Math.random()*10) + 1,
    memberId: '1',
    photos: [{ id: Math.floor(Math.random()*10) + 1, url: imageUrl, memberId: '1' }]
  });
  if (response.status) {
    return response.data
  }
  return null
}

async function deleteMemberPhoto() {
  const response = await memberApiClient.delete('/member/1/photos');
  if (response.status) {
    return response.data
  }
  return null
}

export const memberService = {
  fetchMemberPhotos,
  addMemberPhotos,
  deleteMemberPhoto
}