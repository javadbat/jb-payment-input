# Changelog

## Unreleased

### Changed

- Updated the React wrapper so an omitted `value` no longer writes an empty live value, allowing the inherited `initialValue` behavior to initialize the component; explicit `null` still clears the live value.

## [3.5.0] - 2026-07-19

### Changed

- Added the React `initialValue` prop and forwarded `value` and `initialValue` directly as React 19 custom-element properties.

### Fixed

- Corrected the React build external and UMD global mapping from `jb-input-react` to `jb-input/react`.
