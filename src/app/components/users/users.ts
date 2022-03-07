export interface Users extends Array<Users> {
  primary_data: {
    name: string;
    last_name: string;
    phone: number;
    nickname: string;
  };
}
