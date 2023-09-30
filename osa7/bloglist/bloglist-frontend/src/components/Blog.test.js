import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("Blogs component renders title and author but not url or likes", () => {
  const blog = {
    title: "otsikko",
    author: "kirjoittaja",
    url: "https://urli.com",
    likes: 201,
    user: {
      name: "Lauri Leppänen",
      username: "late22",
    },
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".titleandauthor");

  expect(div).toHaveTextContent("otsikko");

  expect(div).not.toHaveTextContent("https://urli.com");
});

test("URL, likes and user are displayed when the view button is clicked", async () => {
  const blog = {
    title: "Kirja",
    author: "Kirjoittaja",
    url: "https://url.com",
    likes: 501,
    user: {
      name: "Lauri Leppänen",
      username: "late22",
    },
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      toggleLikes={mockHandler}
      handleDelete={mockHandler}
      userLoggedIn="late22"
    />,
  );

  const button = component.getByText("view");

  const user = userEvent.setup();

  expect(component.container.querySelector(".moredetails")).toHaveStyle(
    "display: none",
  );

  await user.click(button);

  expect(component.container.querySelector(".moredetails")).not.toHaveStyle(
    "display: none",
  );

  expect(component.container).toHaveTextContent(blog.url);
  expect(component.container).toHaveTextContent(`likes ${blog.likes}`);
  expect(component.container).toHaveTextContent(blog.user.name);

  expect(mockHandler.mock.calls).toHaveLength(0);
});

test("Like button pushed twice", async () => {
  const blog = {
    title: "Kirja",
    author: "Kirjoittaja",
    url: "https://url.com",
    likes: 501,
    user: {
      name: "Lauri Leppänen",
      username: "late22",
    },
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      toggleLikes={mockHandler}
      handleDelete={mockHandler}
      userLoggedIn="late22"
    />,
  );

  const button = component.getByText("view");

  const user = userEvent.setup();

  expect(component.container.querySelector(".moredetails")).toHaveStyle(
    "display: none",
  );

  await user.click(button);

  const button2 = component.getByText("like");
  await user.click(button2);
  await user.click(button2);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
