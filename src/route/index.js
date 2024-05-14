// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []
  constructor(names, price, description) {
    this.names = names
    this.price = price
    this.description = description
    this.id = new Date().getTime()
  }

  static add = (product) => {
    this.#list.push(product)
  }

  static getList = () => {
    return this.#list
  }

  static getById = (id) =>
    this.#list.find((product) => product.id === id)

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )

    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, names, price, description) => {
    const product = updateById(
      names,
      price,
      description,
      id,
    )

    if (product) {
      this.update(product, data)
      return true
    } else {
      return false
    }
  }

  static update = (
    product,
    { id, names, price, description },
  ) => {
    if ((id, names, price, description)) {
      product.names = names
      product.price = price
      product.description = description
      product.id = id
    }
  }
}

// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-create',
  })
  // ↑↑ сюди вводимо JSON дані...
})

// ================================================================

//========================================

router.post('/product-create', function (req, res) {
  const { names, price, description } = req.body

  if (names && price && description) {
    const product = new Product(names, price, description)

    Product.add(product)

    console.log(Product.getList())

    res.render('alert', {
      style: 'alert',

      data: {
        message: 'Успішне виконання дії',
        info: 'Товар створений',
        link: '/product-list',
      },
    })
  } else {
    console.log(Product.getList())

    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка !',
        info: 'Товар не створений !',
        link: '/',
      },
    })
  }
})

// ================================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-list', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-list',

    datas: {
      products: {
        list,

        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані...
})

// ================================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-edit', function (req, res) {
  // res.render генерує нам HTML сторінку
  const { id } = req.query
  const product = Product.getById(Number(id))
  // ↙️ cюди вводимо назву файлу з сontainer

  if (product) {
    return res.render('product-edit', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі
      style: 'product-edit',

      data: {
        names: product.names,
        price: product.price,
        description: product.description,
        id: product.id,
      },
    })
  } else {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка !',
        info: 'Товар за таким ID не знайдено !',
        link: '/product-list',
      },
    })
  }

  // ↑↑ сюди вводимо JSON дані...
})

// ================================================================

router.post('/product-edit', function (req, res) {
  // res.render генерує нам HTML сторінку

  const { id, names, price, description } = req.body
  const product = Product.updateById(Number(id), {
    names,
    price,
    description,
  })

  if (product) {
    res.render('alert', {
      style: 'alert',

      data: {
        info: 'Інформація про товар оновлена',
      },
    })
  } else {
    res.render('alert', {
      style: 'alert',

      data: {
        info: 'Сталася помилка !',
        link: '/product-edit',
      },
    })
  }

  // ↑↑ сюди вводимо JSON дані...
})

// ================================================================

router.get('/product-delete', function (req, res) {
  const { id } = req.query

  Product.deleteById(Number(id))

  res.render('alert', {
    style: 'alert',
    data: {
      message: 'Успішне виконання дії',
      info: 'Користувач видалений',
      link: '/product-list',
    },
  })
})

// ================================================================
// Підключаємо роутер до бек-енду
module.exports = router
