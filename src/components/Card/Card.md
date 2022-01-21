## Importing Component

```js static
import Card from '<RootFolder>';
```

## Basic Card:

```html
<Card />
```

<hr/>

## Card with loading:

### Expected
- String or Object

### Default
- false

```html
<Card loading='true' />
```

<hr/>

## Card with custom size Loader:

### Expected

 - <b>big</b>: String
    - Loader size height 370px width 100%
 - <b>middle</b>: String
    - Loader size height 240px width 100%
 - <b>small</b>: String
    - Loader size height 170px width 100%

### Default
- middle

```html
<Card sizeLoader='small' />
```

<hr/>

## Card with error message:

 ### Expected

- String or Object

```html
<Card isError='true' />
```

<hr/>

## Card with information:

### Expected
 - Array objects (news)

```html
<Card news=[{},{},{},...] />
```

<hr/>

## Card with custom styles:

### Expected

 - <b>styles</b>: Add styles to the main component Card
    -  Object with JSX Styles
 - <b>stylesImage</b>: Object with JSX Styles
    - Add styles to Image
 - <b>stylesTitle</b>: Object with JSX Styles
    - Add styles to title
 - <b>imageWidth</b>: String
    - Change width to the image
 - <b>imageHeight</b>: String
    - Change height to the image


```html
<Card styles={...} stylesImage={...} stylesTitle={...} imageWidth='300px' imageHeight='300px' />
```