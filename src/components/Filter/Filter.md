## Importing Component

```js static
import Filter from '<RootFolder>';
```

<hr/>

## Basic Filter:

```html
<Filter />
```

<hr/>

## Filter with handle change type sort:

### Expected

- Function (setState) used to get the new value of sort

```html
<Filter setSortBy={fn()} />
```

<hr/>

## Filter with handle change type sort reset:

### Expected

- Function (setState) 

### Return
- 1 (always return 1 when filter value change)

```html
<Card setPage={fn()} />
```