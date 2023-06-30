import BigO from "./assets/letterO100x100.png"
import BigX from "./assets/letterX100x100.png"
import Empty from "./assets/transparent100x100.png"

export function TileImg({ letter, tileShade }) {
  let className
  if (tileShade === 0) className = "interact-img img-border-dark"
  else className = "interact-img img-border-light"

  let alt, src
  if (letter === "X") {
    alt = "Player: X"
    src = BigX
  } else if (letter === "O") {
    alt = "Computer: O"
    src = BigO
  } else {
    alt = "Empty"
    src = Empty
  }

  return <img src={src} className={className} alt={alt} letter={letter} />
}
