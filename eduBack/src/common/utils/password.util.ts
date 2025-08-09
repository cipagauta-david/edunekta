import * as bcrypt from 'bcrypt';

/**
 * Utilidades para manejo de contraseñas
 */
export class PasswordUtil {
  private static readonly SALT_ROUNDS = 12;

  /**
   * Hashea una contraseña
   * @param password - Contraseña en texto plano
   * @returns Contraseña hasheada
   */
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Compara una contraseña con su hash
   * @param password - Contraseña en texto plano
   * @param hashedPassword - Contraseña hasheada
   * @returns True si coinciden, false si no
   */
  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Genera una contraseña aleatoria
   * @param length - Longitud de la contraseña (default: 12)
   * @returns Contraseña aleatoria
   */
  static generateRandomPassword(length: number = 12): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    return password;
  }
}

