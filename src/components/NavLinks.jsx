// src/components/NavLinks.jsx
import React from 'react';
import { Nav as BootstrapNav } from 'react-bootstrap';
import { NavItem } from './UI/NavLinkStyled';

function NavLinks({ items, isAdmin }) {
  return (
    <BootstrapNav className="me-auto">
      {items.map((item) => {
        const normalized = item.toLowerCase().replace(' ', '');
        const route =
          normalized === 'productlist'
            ? '/products'
            : normalized === 'home'
              ? '/'
              : normalized === 'contact'
                ? '/contact'
                : null;

        return (
          route && (
            <NavItem key={item} to={route} end>
              {item}
            </NavItem>
          )
        );
      })}

      <NavItem to="/offers" end>
        Offers
      </NavItem>

      {isAdmin && (
        <NavItem to="/offers/admin" end>
          Admin
        </NavItem>
      )}
    </BootstrapNav>
  );
}

export default NavLinks;