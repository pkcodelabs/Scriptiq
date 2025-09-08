import { colors } from "../../utils/colors";

import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  StarOutlined,
  PictureOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  NumberOutlined,
} from "@ant-design/icons";

export const employeeFormFields = [
  {
    type: "text",
    name: "username",
    borderRadius: "0px",
    label: "Username",
    customcolour: colors.customPurple,
    customvaluecolour: "gray",
    placeholder: "Enter your username",
    rules: [{ required: true, message: "Name is required" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
    icon: (
      <UserOutlined style={{ fontSize: "20px", color: colors.customPurple }} />
    ),
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    borderRadius: "0px",
    customcolour: colors.customPurple,
    customvaluecolour: "gray",
    placeholder: "Enter your email",
    rules: [{ required: true, message: "email is required" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
    icon: (
      <MailOutlined style={{ fontSize: "20px", color: colors.customPurple }} />
    ),
  },
  {
    type: "password",
    borderRadius: "0px",
    name: "password",
    label: "Password",
    customcolour: colors.customPurple,
    customvaluecolour: "gray",
    placeholder: "Enter your password",
    rules: [{ required: true, message: "password is required" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
    icon: (
      <LockOutlined style={{ fontSize: "20px", color: colors.customPurple }} />
    ),
  },
  {
    type: "select",
    name: "Star",
    label: "Star",
    customcolour: colors.customPurple,
    borderRadius: "0px",
    customvaluecolour: "gray",
    options: ["stared", "normal"],
    rules: [{ required: true, message: "Select Option" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
    icon: (
      <StarOutlined style={{ fontSize: "20px", color: colors.customPurple }} />
    ),
  },
  {
    type: "select",
    name: "role",
    label: "role",
    customcolour: colors.customPurple,
    borderRadius: "0px",
    customvaluecolour: "gray",
    options: ["user", "admin", "employee"],
    rules: [{ required: true, message: "Select role" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
    icon: (
      <TeamOutlined style={{ fontSize: "20px", color: colors.customPurple }} />
    ),
  },
  {
    name: "country",
    label: "Country",
    borderRadius: "0px",
    customcolour: colors.customPurple,
    customvaluecolour: "gray",
    type: "autocomplete",
    colSpan: { xs: 24, sm: 12, lg: 12 },
    options: [
      { label: "India", value: "IN" },
      { label: "United States", value: "US" },
      { label: "Canada", value: "CA" },
      { label: "Germany", value: "DE" },
      { label: "France", value: "FR" },
      { label: "United Kingdom", value: "UK" },
      { label: "Italy", value: "IT" },
      { label: "Spain", value: "ES" },
      { label: "Australia", value: "AU" },
      { label: "New Zealand", value: "NZ" },
      { label: "Brazil", value: "BR" },
      { label: "Mexico", value: "MX" },
      { label: "Argentina", value: "AR" },
      { label: "South Africa", value: "ZA" },
      { label: "Egypt", value: "EG" },
      { label: "Nigeria", value: "NG" },
      { label: "Japan", value: "JP" },
      { label: "China", value: "CN" },
      { label: "South Korea", value: "KR" },
      { label: "Singapore", value: "SG" },
      { label: "Malaysia", value: "MY" },
      { label: "Thailand", value: "TH" },
      { label: "Russia", value: "RU" },
      { label: "Turkey", value: "TR" },
      { label: "UAE", value: "AE" },
    ],
    rules: [{ required: true, message: "Please select your country" }],
    icon: (
      <GlobalOutlined
        style={{ fontSize: "20px", color: colors.customPurple }}
      />
    ),
  },
  {
    name: "state",
    label: "State",
    borderRadius: "0px",
    customcolour: colors.customPurple,
    customvaluecolour: "gray",
    type: "autocomplete",
    colSpan: { xs: 24, sm: 12, lg: 12 },
    options: [
      // India
      { label: "Andhra Pradesh", value: "AP-IN" },
      { label: "Telangana", value: "TG-IN" },

      // USA
      { label: "California", value: "CA-US" },
      { label: "New York", value: "NY-US" },

      // Canada
      { label: "Ontario", value: "ON-CA" },
      { label: "Quebec", value: "QC-CA" },

      // Germany
      { label: "Bavaria", value: "BY-DE" },
      { label: "Berlin", value: "BE-DE" },

      // France
      { label: "Île-de-France", value: "IDF-FR" },
      { label: "Provence-Alpes-Côte d'Azur", value: "PACA-FR" },

      // UK
      { label: "England", value: "ENG-UK" },
      { label: "Scotland", value: "SCT-UK" },

      // Italy
      { label: "Lombardy", value: "LO-IT" },
      { label: "Sicily", value: "SI-IT" },

      // Spain
      { label: "Catalonia", value: "CAT-ES" },
      { label: "Andalusia", value: "AND-ES" },

      // Australia
      { label: "New South Wales", value: "NSW-AU" },
      { label: "Victoria", value: "VIC-AU" },

      // Brazil
      { label: "São Paulo", value: "SP-BR" },
      { label: "Rio de Janeiro", value: "RJ-BR" },

      // Japan
      { label: "Tokyo", value: "TK-JP" },
      { label: "Osaka", value: "OS-JP" },

      // China
      { label: "Guangdong", value: "GD-CN" },
      { label: "Beijing", value: "BJ-CN" },

      // South Africa
      { label: "Gauteng", value: "GT-ZA" },
      { label: "Western Cape", value: "WC-ZA" },

      // UAE
      { label: "Dubai", value: "DU-AE" },
      { label: "Abu Dhabi", value: "AD-AE" },
    ],
    rules: [{ required: true, message: "Please select your state" }],
    icon: (
      <EnvironmentOutlined
        style={{ fontSize: "20px", color: colors.customPurple }}
      />
    ),
  },
  {
    type: "text",
    name: "pincode",
    borderRadius: "0px",
    label: "Pincode",
    customcolour: colors.customPurple,
    customvaluecolour: "gray",
    placeholder: "Enter your pincode",
    rules: [
      { required: true, message: "Pincode is required" },
      {
        pattern: /^[0-9]{5,6}$/,
        message: "Pincode must be 5 or 6 digits",
      },
    ],
    colSpan: { xs: 24, sm: 12, lg: 12 },
    icon: (
      <NumberOutlined
        style={{ fontSize: "20px", color: colors.customPurple }}
      />
    ),
  },
  {
    type: "upload",
    name: "profile",
    label: "Profile Image",
    customcolour: colors.customPurple,
    customvaluecolour: "gray",
    accept: ".png,.jpg,.jpeg",
    maxSize: 50, // MB
    minSize: 0.1, // MB
    colSpan: { xs: 24, sm: 12, lg: 10 },
    icon: (
      <PictureOutlined
        style={{ fontSize: "20px", color: colors.customPurple }}
      />
    ),
  },
  {
    label: "Bio",
    name: "bio",
    type: "textarea",
    rules: [{ required: false, message: "Please enter your bio" }],
    colSpan: { xs: 24, sm: 24, lg: 24 },
    row: 4,
  },
];
export const storyPostFeilds = [
  {
    type: "text",
    name: "scriptTitle",
    rules: [{ required: true, message: "Please enter Script Title" }],
    labelFontSize: "18px",
    borderRadius: "0px",
    label: "Script Title",
    customcolour: colors.customPurple,
    customvaluecolour: "gray",
    placeholder: "Enter your Script Title",
    //rules: [{ required: true, message: "Name is required" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
    icon: (
      <UserOutlined style={{ fontSize: "20px", color: colors.customPurple }} />
    ),
  },
  {
    type: "select",
    name: "genre",
    labelFontSize: "18px",
    rules: [{ required: true, message: "Please select genre" }],
    label: "Genre",
    customcolour: colors.customPurple,
    borderRadius: "0px",
    customvaluecolour: "gray",
    options: [
      "Action",
      "Drama",
      "Comedy",
      "Thriller",
      "Romance",
      "Horror",
      "Sci-Fi",
      "Fantasy",
      "Animation",
      "Documentary",
    ],
    //rules: [{ required: true, message: "Select Genre" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
    icon: (
      <StarOutlined style={{ fontSize: "20px", color: colors.customPurple }} />
    ),
  },
  {
    label: "Script",
    name: "script",
    customcolour: colors.customPurple,
    labelFontSize: "18px",
    type: "textarea",
    rules: [
      {
        required: true,
        message: "Please enter your script",
      },
      {
        validator: (_, value) => {
          if (value && value.length >= 100) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error("Script must be at least 100 characters long")
          );
        },
      },
    ],
    colSpan: { xs: 24, sm: 24, lg: 24 },
    row: 4,
  },
  {
    type: "upload",
    name: "storyImage",
    label: "Story Image",
    labelFontSize: "18px",

    customcolour: colors.customPurple,
    customvaluecolour: "gray",
    accept: ".png,.jpg,.jpeg",
    maxSize: 50, // MB
    minSize: 0.1, // MB
    colSpan: { xs: 24, sm: 12, lg: 10 },
    icon: (
      <PictureOutlined
        style={{ fontSize: "20px", color: colors.customPurple }}
      />
    ),
  },
];
