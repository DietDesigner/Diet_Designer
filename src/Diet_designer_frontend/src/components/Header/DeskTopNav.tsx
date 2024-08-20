import { Flex, Text, Link } from "@chakra-ui/react";
import { NavLinks } from "../../data/NavLinks";

const DeskTopNav = () => {
  return (
    <Flex
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"2rem"}
      fontWeight={"400"}
      fontFamily={"Open Sans"}
    >
      {NavLinks.map((item, index) => (
        <Text
          as={Link}
          href={
            item.link !== "contactus" && item.link !== "location"
              ? item.link
              : undefined
          }
          key={index}
          fontSize={"16px"}
          fontWeight={"700"}
          fontFamily={"Fira Sans"}
          color={"#101928"}
          _hover={{
            cursor: "pointer",
            color: "#495057",
            textDecor: "none",
          }}
          lineHeight={"32px"}
        >
          <div className="flex flex-row justify-center items-center gap-[.2rem]">
            <Text>{item.navitem}</Text>
            <Text>
              {item.navitem !== "Pricing" && (
                <img
                  src="/assets/button-icon.svg"
                  width={15}
                  height={15}
                  alt="icon"
                />
              )}
            </Text>
          </div>
        </Text>
      ))}
    </Flex>
  );
};

export default DeskTopNav;
