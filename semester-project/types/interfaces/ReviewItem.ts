export default interface ReviewItem {
  id: number;
  stars: number;
  comment: string;
  likes: number;
  user: {
    firstName: string;
    lastName: string;
    profileImageId: number;
  };
}
