import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import AppRoutes from '/imports/ui/AppRoutes';
import './styles/tailwind.css';

// Start de client en render de AppRoutes component in de root van de applicatie 
Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(<AppRoutes />);
});
