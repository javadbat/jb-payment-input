# jb-payment-input

payment input web component for 16 digit card number and shaba number with this benefit:

- easy to add custom regex or function validation.

- multiple validation with different message.

- support both RTL and LTR.

- add label and message in UX frienly format.

- customizable ui with css variable so you can have multiple style in different scope of your app.

- will accept persian number char and convert them to english char

this component use `jb-input` as a dependancy.
## instructions

### install

#### using npm

```cmd
npm i jb-payment-input
```

in one of your js in page

```js
import 'jb-payment-input';

```

in your html or jsx

```html
<jb-payment-input class="" label="card number:" message="subtitle of input box"></jb-input>
```
#### using cdn

you can just add script tag to your html file and then use web component how ever you need

```HTML
<script src="https://unpkg.com/jb-payment-input/dist/JBPaymentInput.umd.js"></script>
```

### get/set value

```js
//get value
const inputValue = document.getElementByTagName('jb-payment-input').value;
//set value
document.getElementByTagName('jb-payment-input').value = "new string";
```

### events

```js
document.getElementByTagName('jb-payment-input').addEventListener('change',(event)=>{console.log(event.target.value)});
document.getElementByTagName('jb-payment-input').addEventListener('keyup',(event)=>{console.log(event.target.value)});
document.getElementByTagName('jb-payment-input').addEventListener('keydown',(event)=>{console.log(event.target.value)});
document.getElementByTagName('jb-payment-input').addEventListener('keypress',(event)=>{console.log(event.target.value)});
document.getElementByTagName('jb-payment-input').addEventListener('input',(event)=>{console.log(event.target.value)});
document.getElementByTagName('jb-payment-input').addEventListener('beforeinput',(event)=>{console.log(event.target.value)});
// when user press enter on keyboard(dispatched on onKeyup)
document.getElementByTagName('jb-payment-input').addEventListener('enter',(event)=>{console.log(event.target.value)});
```
### other attribute

| atribute name  | description                                                                                                         |
| -------------  | -------------                                                                                                       |
| name           | name you want to set to actual input element `<jb-input name="username"></jb-input>`                                |
| message        | in botton of input we show small message for example "user name must be at least 5 char"                            |
| autocomplete   | set autocomplete directly into dom element in case you need it                                                      |
| direction      | set web-component direction defualt set is rtl but if you need ltr use `<jb-input direction="ltr"></jb-input>`      |
| disabled       | disable the input                                                                                                   |
| input-type     | `CARD_NUMBER` for 16 card number and `SHABA_NUMBER` to type shaba number input                                      |

### set custom style

in some cases in your project you need to change default style of web-component for example you need zero margin or different border-radius and etc.    
if you want to set a custom style to this web-component all you need is to set css variable in parent scope of web-component.
since jb-payment-input use jb-input underneath, read [jb-input](https://github.com/javadbat/jb-input) custom style list
