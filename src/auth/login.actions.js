import argon2 from 'argon2';
async function verificarPassword(password, hash) {
    return await argon2.verify(hash, password);
}
export { verificarPassword };