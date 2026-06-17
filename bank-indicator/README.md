# bank-indicator

`bank-indicator` is the companion web component used with `jb-payment-input` to display an Iranian bank logo from a card prefix.

## Usage

Use it inside a `jb-payment-input` when the payment input is in `CARD` mode. The indicator finds the closest parent `jb-payment-input`, listens to its `input` event, and detects the bank from the first six digits.

```js
import 'jb-payment-input';
import 'jb-payment-input/bank-indicator';
```

```html
<jb-payment-input input-type="CARD" label="Card number">
  <bank-indicator slot="end-section"></bank-indicator>
</jb-payment-input>
```

Use it standalone by setting `prefix`.

```html
<bank-indicator prefix="603799"></bank-indicator>
```

## API reference

### Attributes

| name | type | description |
| --- | --- | --- |
| `prefix` | `string` | Six-digit card prefix used for bank detection. |

### Properties

| name | type | readonly | description |
| --- | --- | --- | --- |
| `selectedBank` | `BankItem \| null` | no | Currently detected bank. Set to `null` to show the default card icon. |
| `bankInfo` | `BankInfo` | no | List of supported banks and prefixes. |

### Events

| event | description |
| --- | --- |
| `load` | Dispatched from `connectedCallback` before initialization. |
| `init` | Dispatched from `connectedCallback` after initialization. |

## CSS variables

| CSS variable name | description |
| --- | --- |
| `--bank-indicator-padding` | Bank logo padding. Default is `8px 16px`. |

## Related Docs

- See [`jb-payment-input`](https://github.com/javadbat/jb-payment-input).
- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.

## AI agent notes

- Import `jb-payment-input/bank-indicator` before using `<bank-indicator>`.
- Put `<bank-indicator slot="end-section">` or `<bank-indicator slot="start-section">` inside `<jb-payment-input input-type="CARD">` for automatic detection.
- Use the `prefix` attribute for standalone detection.
