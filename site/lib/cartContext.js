import { createContext, useContext, useEffect, useState } from 'react'

export const CartContext = createContext({})

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState({})
  useEffect(() => {
    const loadedCart = localStorage.getItem('cart')
    if (!loadedCart) return
    setItems(JSON.parse(loadedCart))
  }, [])
  const addToCart = (product, selectedVariation) => {
    const variation = selectedVariation[0]
    const variationId = variation.optionName1 + variation.optionName2

    setItems(current => {
      const newCart = { ...current }
      if (current[product.id]) {
        if (current[product.id].qtd[variationId]) {
          current[product.id].qtd[variationId].qtd++
        } else {
          newCart[product.id].qtd[variationId] = {
            variation,
            qtd: 1
          }
        }
      } else {
        newCart[product.id] = {
          product,
          qtd: {
            [variationId]: {
              variation,
              qtd: 1
            }
          }
        }
      }
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }
  const changeQtd = (product, productVariation, increment) => {
    setItems(current => {
      const newCart = { ...current }
      if (
        !(
          newCart[product.id].qtd[productVariation].qtd === 1 &&
          increment === -1
        )
      )
        newCart[product.id].qtd[productVariation].qtd += increment
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }
  const removeFromCart = product => {
    setItems(current => {
      const newCart = { ...current }
      delete newCart[product.id]
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }
  const removeVariationFromCart = (product, productVariation) => {
    setItems(current => {
      const newCart = { ...current }
      if (Object.keys(newCart[product.id].qtd).length === 1) {
        delete newCart[product.id]
      } else {
        delete newCart[product.id].qtd[productVariation]
      }
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }
  const cartTotal = () => {
    return Object.keys(items).reduce((prev, productId) => {
      const productPrice = items[productId].product.price
      const qtd = items[productId].qtd
      const subTotal = Object.keys(qtd).reduce((prevSubTotal, variation) => {
        const price = qtd[variation].variation.price
          ? qtd[variation].variation.price
          : productPrice
        return prevSubTotal + qtd[variation].qtd * price
      }, 0)
      return prev + subTotal
    }, 0)
  }
  const size = Object.keys(items).length

  return (
    <CartContext.Provider
      value={{
        items,
        size,
        addToCart,
        changeQtd,
        removeFromCart,
        removeVariationFromCart,
        cartTotal: cartTotal()
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const cart = useContext(CartContext)
  return cart
}
