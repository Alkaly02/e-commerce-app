import React, { useEffect, useState } from "react";
import { AiOutlineAppstoreAdd, AiOutlineHome } from "react-icons/ai";
import firstLetterUpperCase from "../utils/functions/firstLetterUpperCase";
import useCategories from "./useCategories";

const useUserSidebarData = () => {
  const [userData, setUserData] = useState([]);

  const { categories } = useCategories();

  useEffect(() => {
    let initialLink = {
      to: "",
      label: "Acceuil",
      icon: <AiOutlineHome />,
    };
    const sidebarLinks = [];
    categories?.forEach((category) => {
      sidebarLinks.push({
        to: category.id,
        label: firstLetterUpperCase(category.categoryName),
        icon: <AiOutlineAppstoreAdd />,
      });
    });

    setUserData([initialLink, ...sidebarLinks]);
  }, [categories]);

  return { userData };
};

export default useUserSidebarData;
