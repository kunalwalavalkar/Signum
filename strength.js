const strengthMeter = document.getElementById('strength-meter')
const passwordInput = document.getElementById('password-input')
const reasonsContainer = document.getElementById('reasons')

passwordInput.addEventListener('input', updateStrengthMeter)
updateStrengthMeter()

function updateStrengthMeter() {
  const weaknesses = calculatePasswordStrength(passwordInput.value)

  let strength = 100
  reasonsContainer.innerHTML = ''
  weaknesses.forEach(weakness => {
    if (weakness == null) return
    strength -= weakness.deduction
    const messageElement = document.createElement('div')
    messageElement.innerText = weakness.message
    reasonsContainer.appendChild(messageElement)
  })
  strengthMeter.style.setProperty('--strength', strength)
}

function calculatePasswordStrength(password) {
  const weaknesses = []
  weaknesses.push(lengthWeakness(password))
  weaknesses.push(lowercaseWeakness(password))
  weaknesses.push(uppercaseWeakness(password))
  weaknesses.push(numberWeakness(password))
  weaknesses.push(specialCharactersWeakness(password))
  weaknesses.push(repeatCharactersWeakness(password))
  return weaknesses
}

function lengthWeakness(password) {
  const length = password.length

  if (length <= 5) {
    return {
      message: 'YOUR PASSWORD IS TOO SHORT',
      deduction: 40
    }
  }

  if (length <= 10) {
    return {
      message: 'YOUR PASSWORD COULD BE LONGER',
      deduction: 15
    }
  }
}

function uppercaseWeakness(password) {
  return characterTypeWeakness(password, /[A-Z]/g, 'UPPERCASE CHARACTERS')

}

function lowercaseWeakness(password) {
  return characterTypeWeakness(password, /[a-z]/g, 'LOWERCASE CHARACTERS')
}

function numberWeakness(password) {
  return characterTypeWeakness(password, /[0-9]/g, 'NUMBERS')
}

function specialCharactersWeakness(password) {
  return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'SPECIAL CHARACTERS')
}

function characterTypeWeakness(password, regex, type) {
  const matches = password.match(regex) || []

  if (matches.length === 0) {
    return {
      message: `YOUR PASSWORD HAS NO ${type}`,
      deduction: 20
    }
  }

  if (matches.length <= 2) {
    return {
      message: `YOUR PASSWORD COULD USE MORE ${type}`,
      deduction: 5
    }
  }
}

function repeatCharactersWeakness(password) {
  const matches = password.match(/(.)\1/g) || []
  if (matches.length > 0) {
    return {
      message: 'YOUR PASSWORD HAS REPEAT CHARACTERS',
      deduction: matches.length * 10
    }
  }
}