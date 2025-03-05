import crypto from 'crypto'
import is from './is'

type PasswordOptions = {
  length?: number
  lowercase?: boolean
  uppercase?: boolean
  digit?: boolean
  special?: boolean
}

type ValidationResult = {
  isValid: boolean
  length?: string
  lowercase?: string
  uppercase?: string
  digit?: string
  special?: string
  reasons?: string[]
}

type CspDirective =
  | 'default-src'
  | 'script-src'
  | 'style-src'
  | 'img-src'
  | 'connect-src'
  | 'font-src'
  | 'object-src'
  | 'media-src'
  | 'frame-src'
  | 'sandbox'
  | 'report-uri'
  | 'child-src'
  | 'form-action'
  | 'frame-ancestors'
  | 'plugin-types'
  | 'worker-src'
  | 'manifest-src'
  | 'navigate-to'

type CspConfig = {
  [directive in CspDirective]?: string[]
}

const security = {
  string: {
    code(length: number): string {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let result = ''

      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }

      return result
    },
    obfuscate(input: string): string {
      let result = ''

      for (const char of input) {
        if (char >= 'a' && char <= 'z') {
          result += char.toUpperCase()
        } else if (char >= 'A' && char <= 'Z') {
          result += char.toLowerCase()
        } else {
          result += char
        }
      }

      return result
    },
    deobfuscate(input: string): string {
      return this.obfuscate(input)
    }
  },
  input: {
    sanitize(input: string): string {
      return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    }
  },
  base64: {
    encode(value: any, obfuscate = false): string {
      if (value && typeof value === 'object') {
        const base64String = Buffer.from(JSON.stringify(value)).toString('base64')

        if (obfuscate) {
          return security.string.obfuscate(base64String)
        }

        return base64String
      }

      if (typeof value === 'string') {
        if (obfuscate) {
          return security.string.obfuscate(Buffer.from(value).toString('base64'))
        }

        return Buffer.from(value).toString('base64')
      }

      return ''
    },
    decode(value: any, isObfuscated = false): string | object | null {
      let buffer = ''

      if (typeof value === 'string') {
        if (isObfuscated) {
          value = security.string.deobfuscate(value)
        }

        buffer = Buffer.from(value, 'base64').toString('ascii')
      }

      if (is(buffer).json()) {
        buffer = JSON.parse(Buffer.from(value, 'base64').toString('ascii'))
      }

      return buffer
    }
  },
  password: {
    validation(password: string, options: PasswordOptions = {}): ValidationResult {
      const validations = {
        length: options.length || 8,
        lowercase: options.lowercase || true,
        uppercase: options.uppercase || true,
        digit: options.digit || true,
        special: options.special || true,
        reasons: []
      }

      const errors: ValidationResult = {
        isValid: true,
        reasons: []
      }

      // Check for password length
      if (password.length < validations.length) {
        errors.reasons?.push('length')
        errors.length = `Password should be at least ${validations.length} characters long.`
        errors.isValid = false
      }

      // Check for at least one lowercase character
      if (validations.lowercase && !/[a-z]/.test(password)) {
        errors.reasons?.push('lowercase')
        errors.lowercase = 'Password should contain at least one lowercase character.'
        errors.isValid = false
      }

      // Check for at least one uppercase character
      if (validations.uppercase && !/[A-Z]/.test(password)) {
        errors.reasons?.push('uppercase')
        errors.uppercase = 'Password should contain at least one uppercase character.'
        errors.isValid = false
      }

      // Check for at least one digit
      if (validations.digit && !/[0-9]/.test(password)) {
        errors.reasons?.push('digit')
        errors.digit = 'Password should contain at least one digit.'
        errors.isValid = false
      }

      // Check for at least one special character
      if (validations.special && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.reasons?.push('special')
        errors.special = 'Password should contain at least one special character.'
        errors.isValid = false
      }

      return errors
    },
    match(p1: string, p2: string, allowWeekPassword = false): ValidationResult {
      if (!allowWeekPassword && !security.password.validation(p1).isValid) {
        return security.password.validation(p1)
      }

      if (!allowWeekPassword && !security.password.validation(p2).isValid) {
        return security.password.validation(p2)
      }

      return p1 === p2 ? { isValid: true } : { isValid: false }
    },
    encrypt(str: string): string {
      return crypto.createHash('sha1').update(str.toString()).digest('hex')
    }
  },
  csp: {
    generator(config: CspConfig): string {
      return Object.entries(config)
        .map(([directive, sources]) => {
          return `${directive} ${sources?.join(' ')}`
        })
        .join('; ')
    }
  },
  mask: {
    email(email: string): string {
      const [localPart, domainPart] = email.split('@')
      const [domainName, tld] = domainPart.split('.')
      return `${localPart.substring(0, 3)}*****@${domainName.substring(0, 2)}*****.${tld}`
    },
    phone(phone: string): string {
      const visibleDigits = 5
      const masked = phone.slice(0, -visibleDigits).replace(/\d/g, 'x')
      return `${masked}${phone.slice(-visibleDigits)}`
    },
    text(data: string, startKeep: number = 2, endKeep: number = 2, maskChar: string = '*'): string {
      if (data.length <= startKeep + endKeep) return data
      const visibleStart = data.slice(0, startKeep)
      const visibleEnd = data.slice(-endKeep)
      const maskLength = data.length - (startKeep + endKeep)
      const maskedPart = Array(maskLength).fill(maskChar).join('')
      return `${visibleStart}${maskedPart}${visibleEnd}`
    }
  }
}

export default security
