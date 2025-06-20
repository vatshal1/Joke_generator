const btn = document.querySelector("button");
const para = document.querySelector("p");
const category = document.querySelector("#category");

btn.addEventListener("click", joke);

//-> using async/ await
async function joke() {
  btn.disabled = true;
  para.classList.remove("error");
  btn.textContent = "Loading...";

  try {
    const response = await fetch(
      `https://v2.jokeapi.dev/joke/${category.value}?blacklistFlags=racist,sexist,explicit&type=single`
    );
    if (!response.ok)
      throw new Error(`Error occured! status: ${response.status}`);

    const data = await response.json();
    para.innerText = `"${data.joke}"`;
  } catch (err) {
    para.classList.add("error");
    para.innerText =
      "Sorry couldn't fetch the joke right now. Please try again!";
  } finally {
    btn.disabled = false;
    btn.textContent = "Get Jokes";
  }
}
