const PouchDB = require('pouchdb');
const bcrypt = require('bcrypt');
const db = new PouchDB('users');

const ROLES = {
    CLIENT: 'client',
    VENDEUR: 'vendeur',
    ADMIN: 'admin'
};

class User {
    static async addUser({ name, email, password, role = ROLES.CLIENT }) {
        try {
            // Hash du mot de passe
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = {
                _id: `user_${Date.now()}`,
                name,
                email,
                password: hashedPassword,
                role,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const result = await db.put(user);
            user._rev = result.rev;
            return user;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            const result = await db.allDocs({
                include_docs: true
            });
            const user = result.rows.find(row => row.doc.email === email);
            return user ? user.doc : null;
        } catch (error) {
            console.error('Erreur lors de la recherche par email:', error);
            throw error;
        }
    }

    static async validatePassword(user, password) {
        try {
            return await bcrypt.compare(password, user.password);
        } catch (error) {
            console.error('Erreur lors de la validation du mot de passe:', error);
            throw error;
        }
    }

    static async getUser(id) {
        try {
            return await db.get(id);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error);
            throw error;
        }
    }

    static async updateUser(id, updates) {
        try {
            const user = await db.get(id);
            const updatedUser = {
                ...user,
                ...updates,
                updatedAt: new Date().toISOString()
            };
            const result = await db.put(updatedUser);
            updatedUser._rev = result.rev;
            return updatedUser;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            throw error;
        }
    }

    static async delUser(id) {
      return new Promise((resolve, reject) => {
        const db = new PouchDB('datas/usersdb');
        db.get(id).then(function(doc) {
          return db.remove(doc);
        }).then(function (res) {
          console.log('[Model] User.delUser(' + JSON.stringify(id) + '): return ' + JSON.stringify(res));  
          resolve(res); // {"ok":true,"id":"...","rev":"..."}
        }).catch(function (err) {
          reject(new Error('User.delUser(' + JSON.stringify(id) + '): ' + err));
        });
      });
    }

    static async getAllVendeurs() {
        try {
            const result = await db.allDocs({
                include_docs: true
            });
            return result.rows
                .map(row => row.doc)
                .filter(user => user.role === ROLES.VENDEUR);
        } catch (error) {
            console.error('Erreur lors de la récupération des vendeurs:', error);
            throw error;
        }
    }

    static async getAllUsers() {
        try {
            const result = await db.allDocs({
                include_docs: true
            });
            return result.rows.map(row => row.doc);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            throw error;
        }
    }

    static get ROLES() {
        return ROLES;
    }
}

module.exports = User;