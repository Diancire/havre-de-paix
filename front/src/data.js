import {
    TbBeach, TbMountain, TbPool 
} from "react-icons/tb";
import {
    GiBarn,
    GiBoatFishing,
    GiCactus,
    GiCastle,
    GiCaveEntrance,
    GiForestCamp,
    GiIsland,
    GiWindmill,
} from "react-icons/gi";
import {
    FaSkiing,
} from "react-icons/fa";
import { 
    FaHouseUser,
    FaPeopleRoof,
} from "react-icons/fa6";
import {
    BiWorld,
} from "react-icons/bi";
import { 
    BsSnow,
    BsFillDoorOpenFill,
} from "react-icons/bs";
import { 
    IoDiamond } from "react-icons/io5";
import { 
    MdOutlineVilla } from "react-icons/md";

export const categories = [
    {
        label: "Tout",
        icon: <BiWorld />,
    },
    {
        img: "assets/categories/beach_cat.jpg",
        label: "Bord de mer",
        icon: <TbBeach />,
        description: "Cette propriété est proche de la plage !",
    },
    {
        img: "assets/categories/windmill_cat.jpg",
        label: "Moulins à vent",
        icon: <GiWindmill />,
        description: "Cette propriété possède des moulins à vent !",
    },
    {
        img: "assets/categories/modern_cat.jpg",
        label: "Villes emblématiques",
        icon: <MdOutlineVilla />,
        description: "Cette propriété est moderne !",
    },
    {
        img: "assets/categories/countryside_cat.jpg",
        label: "Campagne",
        icon: <TbMountain />,
        description: "Cette propriété est à la campagne !",
    },
    {
        img: "assets/categories/pool_cat.jpg",
        label: "Piscines incroyables",
        icon: <TbPool />,
        description: "Cette propriété possède une belle piscine !",
    },
    {
        img: "assets/categories/island_cat.jpg",
        label: "Îles",
        icon: <GiIsland />,
        description: "Cette propriété est sur une île !",
    },
    {
        img: "assets/categories/lake_cat.jpg",
        label: "Bord de lac",
        icon: <GiBoatFishing />,
        description: "Cette propriété est près d'un lac !",
    },
    {
        img: "assets/categories/skiing_cat.jpg",
        label: "Ski",
        icon: <FaSkiing />,
        description: "Cette propriété propose des activités de ski !",
    },
    {
        img: "assets/categories/castle_cat.jpg",
        label: "Châteaux",
        icon: <GiCastle />,
        description: "Cette propriété est un ancien château !",
    },
    {
        img: "assets/categories/cave_cat.jpg",
        label: "Grottes",
        icon: <GiCaveEntrance />,
        description: "Cette propriété est dans une grotte effrayante !",
    },
    {
        img: "assets/categories/camping_cat.jpg",
        label: "Camping",
        icon: <GiForestCamp />,
        description: "Cette propriété propose des activités de camping !",
    },
    {
        img: "assets/categories/arctic_cat.webp",
        label: "Arctique",
        icon: <BsSnow />,
        description: "Cette propriété est dans un environnement arctique !",
    },
    {
        img: "assets/categories/desert_cat.jpg",
        label: "Désert",
        icon: <GiCactus />,
        description: "Cette propriété est dans le désert !",
    },
    {
        img: "assets/categories/barn_cat.jpg",
        label: "Granges",
        icon: <GiBarn />,
        description: "Cette propriété est dans une grange !",
    },
    {
        img: "assets/categories/lux_cat.jpg",
        label: "Luxe",
        icon: <IoDiamond />,
        description: "Cette propriété est neuve et luxueuse !",
    },
];

export const types = [
    {
      name: "Un logement entier",
      description: "Les invités ont tout le logement pour eux-mêmes.",
      icon: <FaHouseUser />,
    },
    {
      name: "Une ou plusieurs chambres",
      description:
        "Les invités ont leur propre chambre dans une maison, avec accès aux espaces partagés.",
      icon: <BsFillDoorOpenFill />,
    },
    {
      name: "Une chambre partagée",
      description:
        "Les invités dorment dans une chambre ou un espace commun qui peut être partagé avec vous ou d'autres personnes.",
      icon: <FaPeopleRoof />,
    },
  ];