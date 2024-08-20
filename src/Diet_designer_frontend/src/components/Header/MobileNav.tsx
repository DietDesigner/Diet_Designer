import { Stack, useDisclosure, Flex, Link } from "@chakra-ui/react";
import { MobileNavLinks } from "../../data/NavLinks";

const MobileNav = () => {
  return (
    <Stack bg={"#fff"} p={10} display={{ xl: "none" }}>
      {MobileNavLinks.map((navItem) => (
        <MobileNavItem key={navItem.navitem} {...navItem} />
      ))}
    </Stack>
  );
};

export default MobileNav;

const MobileNavItem = ({
  navitem,
  children,
  link,
}: {
  navitem: any;
  children?: any;
  link?: any;
}) => {
  const { onClose } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onClose}>
      <Flex
        py={4}
        as={link !== "contactus" && link !== "location" ? Link : undefined}
        href={link !== "contactus" && link !== "location" ? link : undefined}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
        borderBottom={"0.5px solid rgba(175, 175, 175, 1) "}
      >
        <button className="text-[#15265E]">{navitem}</button>
      </Flex>
    </Stack>
  );
};
