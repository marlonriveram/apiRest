const {faker} = require('@faker-js/faker');
class UsersService {
  constructor(){
    this.users = [],
    this.generate()
  }

  generate(){
    const limit = 10;
    for(let i = 1 ; i <= limit ; i++){
      this.users.push({
        userId:faker.string.uuid(),
        userName: faker.internet.userName(),
        avatar: faker.image.avatar()
      })
    }
  };

  find(){
    return this.users;
  };

  findOne(id){
    if(!!id ){
      throw new Error('user not found');
    }else{
      return this.users.find(user=> user.userId === id);
    }
  };

  create(data){
    const newUser = {
      userId:faker.string.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  };

  upDate(id,change){
    const index = this.users.findIndex(user => user.userId === id);
    if(index === -1){
      throw new Error ('user not found');
    }else{
      const user = this.users[index];
      this.users[index] = {
        ...user,
        ...change
      }
      return this.users[index];
    }
  };

  delete(id){
    const index = this.users.findIndex(user => user.userId === id);
    if(index === -1){
      throw new Error ('user not found');
    }else{
     this.users.splice(index,1);
     return id;

    }
  };
};



module.exports = UsersService;
