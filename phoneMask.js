document.addEventListener('DOMContentLoaded', () => {
  const phoneInputs = document.querySelectorAll('input[data-tel-input');

  function getInputNumbersValue(input) {
    return input.value.replace(/\D/g, "")
  }

  function onPhoneInput(event) {
    const input = event.target;
    let inputNumbersValue = getInputNumbersValue(input);
    let formattedInputValue = '';
    let selectionStart = input.selectionStart;

    if(!inputNumbersValue) return input.value = "";

    if(input.value.length !== selectionStart) {
      if(event.data && /\D/g.test(event.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if(['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
      //Russian phone number
      if(inputNumbersValue[0] === '9') inputNumbersValue = "7" + inputNumbersValue
      let firstSymbols = inputNumbersValue[0] === "8" ? "8" : "+7";
      formattedInputValue = firstSymbols + ' ';

      if(inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }
      if(inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if(inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if(inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      //Not Russian phone number
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  }

  function onPhoneKeyDown(event) {
    const input = event.target;
    if(event.keyCode === 8 && getInputNumbersValue(input).length === 1) {
      input.value = '';
    }
  }

  function onPhonePaste(event) {
    const pasted = event.clipboardData || window.clipboardData;
    const input = event.target;
    let inputNumbersValue = getInputNumbersValue(input);
    if(pasted) {
      let pastedText = pasted.getData("Text");
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  }

  for(let i = 0; i < phoneInputs.length; i++) {
    const phoneInput = phoneInputs[i];
    phoneInput.addEventListener('input', onPhoneInput);
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('paste', onPhonePaste);
  }

})

