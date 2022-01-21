## Importing Component

```js static
import Pagination from '<RootFolder>';
```

<hr/>

## Basic Pagination:

```html
<Pagination />
```

<hr/>

## Pagination in exact page

### Expected
- String or Object

### Default
- 1

### Return
- Pagination Component start on page 5

```html
<Pagination page='5' />
```

<hr/>

## Pagination with pages remain:

### Expected

- Number 

### Return
- 5 (By default pagination do the math by 10 to get the remaining pages)

```html
<Card hits='50' />
```

<hr/>

## Pagination with handle change page:

### Expected

- Function (setState) used to set the new value of page on click button prev and next


```html
<Card setPage={fn()} />
```
