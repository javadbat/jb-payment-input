# jb-payment-input

payment input web component for 16 digit card number and shaba number with this benefit:

- easy to add custom regex or function validation.

- multiple validation with different message.

- support both RTL and LTR.

- add label and message in UX frienly format.

- customizable ui with css variable so you can have multiple style in different scope of your app.

- will accept persian/arabic number char and convert them to english char

- you can add iran bank image beside input to show which bank card number is inputed.

this component use `jb-input` as a dependancy so you can customize it's style by jb-input css variables.
## Demo   
Demo & Sample in codepen: <https://codepen.io/javadbat/pen/rNvWdve>
## instructions

### install

#### using npm

1- install npm package
```cmd
npm i jb-payment-input
```

2- import module in one of your js in page

```js
import 'jb-payment-input';

```

3- use compoent in your html or jsx file like any other html tag

```html
<jb-payment-input input-type="CARD_NUMBER" class="" label="card number:" message="subtitle of input box"></jb-input>
```
#### using cdn

1- add script tag to your html file.

```HTML
<script src="https://unpkg.com/jb-input/dist/JBInput.umd.js"></script>
<script src="https://unpkg.com/jb-payment-input/dist/JBPaymentInput.umd.js"></script>
```
2- use web component like any other html tag whenever you need

```html
<div class="some-app-div">
  <jb-payment-input input-type="CARD_NUMBER" class="" label="card number:" message="subtitle of input box"></jb-payment-input>
</div>
```
### get/set value

```js
//get value
const inputValue = document.getElementByTagName('jb-payment-input').value;
//set value
document.getElementByTagName('jb-payment-input').value = "new string";
```
### add bank icons
for card number input you can add bank icon in the start or end of input (currently only support iran banks) so when user type first 6 digit of card number it will show bank logo.    
to make this happen you just have to import and add `bank-indicator` web component
```js
import 'jb-payment-input/dist/bank-indicator/bank-indicator.js';
```
### set custom style
| css variable name          | description                                      |
| -----------------          | -----------                                      |
| --bank-indicator-padding   | banl logo padding,the default value is `8px 16px`|
```html
 <jb-payment-input input-type="CARD_NUMBER" class="" label="card number:" message="with bank indicator">
   <bank-indicator slot="end-section"></bank-indicator>
 </jb-payment-input>
```
you can set slot with `end-section` or `start-section` for position.    
if you want to use bank-indicator outside of jb-payment-input you can set `prefix` attribute with 6 digit number of bank card number.
```html
   <!-- for example for melli card -->
   <bank-indicator prefix="603799"></bank-indicator>
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
