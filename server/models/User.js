const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, '../data/users.json');

class User {
  static async getAll() {
    try {
      const data = await fs.readFile(dbPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  static async findByEmail(email) {
    const users = await this.getAll();
    return users.find(user => user.email === email);
  }

  static async create(userData) {
    const users = await this.getAll();
    const newUser = {
      id: uuidv4(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'user',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    await fs.writeFile(dbPath, JSON.stringify(users, null, 2));
    
    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  static async updatePassword(userId, newPassword) {
    const users = await this.getAll();
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      await fs.writeFile(dbPath, JSON.stringify(users, null, 2));
      return true;
    }
    return false;
  }
  
  
}

module.exports = User; 