# **Tic-Tac-Toe SPA Project**

[**View the application here**](https://adamdeguire.github.io/tic-tac-toe/#)

## **Introduction**

-----------------------

In my first-ever software engineering project, I've created an **HTML**/**CSS**/**JavaScript** front-end single page application wherein a user can:

- **Sign up** with an email and password
- **Sign in**, **sign out**, and **change passwords**
- **Create**, **update**, and **save** Tic-Tac-Toe games on a server
- View **game statistics** like games played, games won, ties, etc.
- Play against a **computer opponent** on three separate **difficulty settings**
- Use/play on any size screen or device thanks to **responsive application design**

### **The technical focus of this project is primarily on the following:**

- Client-Server communication via Asynchronous JavaScript and XML (**AJAX**)
- Mobile-first application design with **Bootstrap** and **SASS**
- DOM traversal and manipulation via **jQuery**
- Single Page Application (**SPA**) design


---

## **Application Overview**

---

### **Sign-In/Out View**

<img src="https://i.imgur.com/5e9Pi0n.jpg" alt="drawing" width="200"/>
<img src="https://i.imgur.com/POvWxoC.jpg" alt="drawing" width="200"/>

### **Main Menu View**

<img src="https://i.imgur.com/gkKAwwl.jpg" alt="drawing" width="200"/>
<img src="https://i.imgur.com/5Y5BhCa.jpg" alt="drawing" width="200"/>

### **Game View**

<img src="https://i.imgur.com/hukBc2n.jpg" alt="drawing" width="200"/>
<img src="https://i.imgur.com/LAVwAOf.jpg" alt="drawing" width="200"/>

### **Statistics View**

<img src="https://i.imgur.com/1nvS5ny.jpg" alt="drawing" width="200"/>
<img src="https://i.imgur.com/CP4zHmF.jpg" alt="drawing" width="200"/>

### **Account View**

<img src="https://i.imgur.com/9r9Rpoh.jpg" alt="drawing" width="200"/>
<img src="https://i.imgur.com/b4ZOukc.jpg" alt="drawing" width="200"/>

---

## **Technical Details**

---

### **Sign Up/In/Out and Change Password**

User authentication in this application is made possible via AJAX calls to a provided API. These calls were made via the **jQuery .ajax()** method. For Sign Up and Sign In, data from form fields is pulled from the page and formatted to a **JSON** object for use in their respective **HTTP** requests. Below is an example of how these functions have been implemented.

```js
// Request new user creation
const signUp = (data) => {
  return $.ajax({
    url: `${config.apiUrl}/sign-up`,
    method: 'POST',
    data: data
  })
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}
```

### **Create, Update, and Save Games**

```js
// Request update of existing game object for existing user
const updateGame = (index, marker, over) => {
  return $.ajax({
    url: `${config.apiUrl}/games/${store.gameId}`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${store.token}`
    },
    data: {
      game: {
        cell: {
          index: index,
          value: marker
        },
        over: over
      }
    }
  })
    .catch(nav.onFailure)
}
```

### **Game Statistics**

```js
  gamesCompleted.forEach(game => {
    const start = new Date(game.createdAt)
    const end = new Date(game.updatedAt)
    gameLengths.push(((end - start) / 1000).toFixed(2))
  })
  const gameTime = (time) => {
    let m = ''
    if (time >= 60) {
      m = Math.floor(time / 60)
    }
    const s = (time - (m * 60)).toFixed(2)
    if (m !== '') {
      m += 'm '
    }
    return `${m} ${s}s`
  }
```

### **Computer Opponent**

```js
const winThisTurn = (marker) => {
  for (let i = 0; i < 9; i++) {
    const board = logic.getBoard()
    if (board[i] === ' ') { board[i] = marker }
    if (logic.gameWon(marker, board)) return i
  }
}
```

### **Computer Difficulty Settings**

```js
    // excerpt from Difficulty: Easy
      count = Math.floor(choices.length / 2)
      for (let i = 0; i < count; i++) {
        const rand = randomMove()
        choices.push(rand)
      }


      // excerpt from Difficulty: Hard
      if (Number.isInteger(winThisTurn('o'))) { return winThisTurn('o') }
      if (Number.isInteger(winThisTurn('x'))) { return winThisTurn('x') }
      if (options.length > 1) return choice
      return randomMove(marker)
```

### **Responsive Application Design**


```css
@media only screen and (max-width: 600px) {
  body {
    width: 80vw;
  }
  .menuBtn {
    margin: 30% auto;
  }
}

@media (min-aspect-ratio: 9/10) {
  body {
    overflow: scroll;
  }
}
```

## **Wireframe**

## **Technologies Used**

- HTML
- CSS
- SASS
- JavaScript
- jQuery
- Bootstrap

## **Link**

[View the application here](https://adamdeguire.github.io/tic-tac-toe/#)
