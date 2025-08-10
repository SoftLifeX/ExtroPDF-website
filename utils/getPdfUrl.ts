const getPdfUrl = (userId: string, fileId: string) => {
  return `https://res.cloudinary.com/dcdtjkvdv/image/upload/v1742798237/user_${userId}/${fileId}.pdf`;
};

export default getPdfUrl;
