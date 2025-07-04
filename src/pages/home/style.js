import styled from "styled-components";

export const Container = styled.div`
    padding: 2rem;

    h1 {
    text-align: center;
    margin: 4rem 0;
    font-weight: bold;
    font-size: 4rem;
    background: linear-gradient(90deg,rgb(255, 105, 200),rgb(165, 153, 255));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
}


    h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 1rem 0 0.5rem 0;
    text-align: center;
    color: pink
  }
`;

export const MovieList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    column-gap: 3rem;
    row-gap: 4rem;
`;

export const Movie = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    img {
        width: 180px;
        border-radius: 1rem;
        margin-bottom: 2rem;
    }
    span {
        font-weight: bold;
        font-size: 120%;
        text-align: center;
    }
    a {
        transition: all 0.3s;
    }
    a:hover {
        transform: scale(1.1);
    }
`;

export const Btn = styled.button`
    margin-top: 5px;
    padding: 0.7rem 3rem;
    border: none;
    border-radius: 15px;
    color: #212121;
    background-color: #ffffff;
    font-weight: 1000;
    font-size: 12px;
    cursor: pointer;
    transition: all 250ms;
`;

export const GenreFilter = styled.div`
  margin-bottom: 3.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;

  label {
    background-color:rgb(237, 218, 255);
    color: #212121;
    padding: 0.5rem 1.2rem;
    border-radius: 10px;
    border: 1.5px solid #ccc;
    cursor: pointer;
    user-select: none;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    transition: all 0.3s ease;

    input {
      margin-right: 0.5rem;
      cursor: pointer;
      accent-color: #212121;
      width: 18px;
      height: 18px;
      vertical-align: middle;
    }

    &:hover {
      background-color:rgb(174, 130, 255);
      border-color: #999;
      box-shadow: 0 4px 10px rgba(33, 1, 75, 0.36);
    }
  }
`;
