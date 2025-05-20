"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useContactForm } from '@/contexts/ContactFormContext';

// Define los tipos de apartados para la barra lateral
type SidebarMenuItem = "dashboard" | "software" | "license" | "settings" | "employees";

export const PlatformLook: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Estado para manejar qué sección está activa
  const [activeSection, setActiveSection] = useState<SidebarMenuItem>("dashboard");
  const { openContactForm } = useContactForm();
  
  // Estados para modales
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedSoftware, setSelectedSoftware] = useState<string>("");
  const [selectedSoftwareIndex, setSelectedSoftwareIndex] = useState<number | null>(null);
  
  // Estado para filas expandidas
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  
  // Estado para la lista de software
  const [softwareList, setSoftwareList] = useState([
    { name: "Brave", version: "2023.4.0", users: ["Ana Garcia", "Carlos Perez", "Diana Lopez", "Enrique Martinez", "Fernando Rodriguez"] },
    { name: "Obsidian", version: "16.0.15330", users: ["Alex Mora", "Beatriz Sanchez", "Carmen Torres", "David Ruiz", "Elena Jimenez", "Felipe Ortiz"] },
    { name: "Slack", version: "4.29.149", users: ["Hector Ramirez", "Ines Vidal", "Jorge Castro", "Lucia Navarro"] },
    { name: "Zoom", version: "5.13.5", users: ["Mar Flores", "Natalia Diaz", "Pablo Serrano", "Raquel Blanco"] },
    { name: "Spotify", version: "116.14.7", users: ["Sofia Muñoz", "Tomas Alvarez", "Valentina Romero"] }
  ]);

  // Datos para la sección de empleados
  const [employeesList, setEmployeesList] = useState([
    { 
      name: "Ana Garcia",
      active: true, 
      software: [
        { name: "Adobe Creative Cloud", version: "2023.4.0" },
        { name: "Microsoft Office 365", version: "16.0.15330" },
        { name: "Maltego Community", version: "5.13.5" }
      ]
    },
    { 
      name: "Carlos Perez",
      active: true, 
      software: [
        { name: "Adobe Creative Cloud", version: "2023.4.0" },
        { name: "Slack", version: "4.29.149" },
        { name: "Figma", version: "116.14.7" }
      ]
    },
    { 
      name: "Diana Lopez",
      active: false, 
      software: [
        { name: "Adobe Creative Cloud", version: "2023.4.0" },
        { name: "Microsoft Office 365", version: "16.0.15330" }
      ]
    },
    { 
      name: "Alex Mora",
      active: true, 
      software: [
        { name: "Microsoft Office 365", version: "16.0.15330" },
        { name: "Slack", version: "4.29.149" }
      ]
    },
    { 
      name: "Hector Ramirez",
      active: true, 
      software: [
        { name: "Slack", version: "4.29.149" },
        { name: "Microsoft Office 365", version: "16.0.15330" },
        { name: "Zoom", version: "5.13.5" }
      ]
    }
  ]);

  // Estado para filas expandidas en la sección de empleados
  const [expandedEmployeeRow, setExpandedEmployeeRow] = useState<number | null>(null);

  // Nuevo estado para controlar qué software tiene vulnerabilidades
  const [vulnerableSoftware, setVulnerableSoftware] = useState<{ [key: string]: boolean }>({
    "Brave": true
  });

  // Nuevo estado para el tooltip de vulnerabilidad
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number, y: number } | null>(null);

  // Estado para filas expandidas en la sección de licencias
  const [expandedLicenseRow, setExpandedLicenseRow] = useState<number | null>(null);

  // Estado para mensajes de notificación
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Estado para licencias pendientes de aprobación
  const [pendingLicenses, setPendingLicenses] = useState([
    { name: "Figma", employee: "Ana Garcia", date: "June 10, 2023", cost: "€15.00", type: "Pro" },
    { name: "Notion", employee: "Carlos Perez", date: "June 12, 2023", cost: "€8.00", type: "Team" },
    { name: "Miro", employee: "Diana Lopez", date: "June 14, 2023", cost: "€12.00", type: "Business" }
  ]);

  // Función para manejar el cambio de sección
  const handleSectionChange = (section: SidebarMenuItem) => {
    setActiveSection(section);
  };

  // Funciones para modales
  const handleDelete = (softwareName: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedList = [...softwareList];
    updatedList.splice(index, 1);
    setSoftwareList(updatedList);
    setNotification({
      message: "This software has been erased from the corporate computers",
      type: 'success'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdate = (softwareName: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se expanda la fila
    setSelectedSoftware(softwareName);
    setShowUpdateModal(true);
  };

  // Función para confirmar la eliminación
  const confirmDelete = () => {
    if (selectedSoftwareIndex !== null) {
      // Crear una copia de la lista y eliminar el elemento seleccionado
      const updatedList = [...softwareList];
      updatedList.splice(selectedSoftwareIndex, 1);
      setSoftwareList(updatedList);
      
      // Si la fila eliminada estaba expandida, resetear el estado
      if (expandedRow === selectedSoftwareIndex) {
        setExpandedRow(null);
      } else if (expandedRow !== null && expandedRow > selectedSoftwareIndex) {
        // Ajustar el índice de la fila expandida si era mayor que la fila eliminada
        setExpandedRow(expandedRow - 1);
      }
      
      closeModals();
    }
  };

  const closeModals = () => {
    setShowDeleteModal(false);
    setShowUpdateModal(false);
    setSelectedSoftwareIndex(null);
  };
  
  // Función para manejar la expansión de filas
  const toggleRowExpansion = (index: number) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  // Función para manejar la actualización de versión
  const handleVersionUpdate = (softwareName: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (vulnerableSoftware[softwareName]) {
      const updatedList = [...softwareList];
      updatedList[index] = {
        ...updatedList[index],
        version: "2024.2.1" // Nueva versión
      };
      setSoftwareList(updatedList);
      setVulnerableSoftware({
        ...vulnerableSoftware,
        [softwareName]: false
      });
      setTooltipPosition(null);
      setNotification({
        message: "This software has been updated in all the corporate computers",
        type: 'success'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Función para mostrar el tooltip
  const handleVersionMouseEnter = (e: React.MouseEvent, softwareName: string) => {
    if (vulnerableSoftware[softwareName]) {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    }
  };

  // Función para ocultar el tooltip
  const handleVersionMouseLeave = () => {
    setTooltipPosition(null);
  };

  // Función para manejar la expansión de filas en la sección de licencias
  const toggleLicenseRowExpansion = (index: number) => {
    if (expandedLicenseRow === index) {
      setExpandedLicenseRow(null);
    } else {
      setExpandedLicenseRow(index);
    }
  };

  // Función para encontrar empleados que usan un software específico
  const findEmployeesWithSoftware = (softwareName: string) => {
    return employeesList.filter(employee => 
      employee.software.some(sw => sw.name === softwareName)
    ).map(employee => ({
      name: employee.name
    }));
  };

  // Función para manejar la expansión de filas en la sección de empleados
  const toggleEmployeeRowExpansion = (index: number) => {
    if (expandedEmployeeRow === index) {
      setExpandedEmployeeRow(null);
    } else {
      setExpandedEmployeeRow(index);
    }
  };

  // Función para aprobar una licencia
  const handleApprove = (index: number) => {
    const updatedPending = [...pendingLicenses];
    updatedPending.splice(index, 1);
    setPendingLicenses(updatedPending);
    setNotification({
      message: "This software has been approved. A card has been sent to the employee to pay the license",
      type: 'success'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  // Función para rechazar una licencia
  const handleReject = (index: number) => {
    const updatedPending = [...pendingLicenses];
    updatedPending.splice(index, 1);
    setPendingLicenses(updatedPending);
    setNotification({
      message: "This software has been rejected, the employee has been notified",
      type: 'success'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <section id="platform" className="py-20 gradient-mesh">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white ${
            notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="container-section">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-lg text-primary-800 dark:text-primary-300 mb-4">
            Interact with our Automated Software Asset Manager
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Below you can interact with our SAM and see how it works.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div ref={ref} className="relative shadow-2xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Software Interface */}
            <div className="flex h-[600px]">
              {/* Sidebar */}
              <div className="w-56 bg-gray-900 text-white flex flex-col">
                {/* Logo */}
                <div className="p-4 border-b border-gray-800 flex items-center">
                  <div className="relative w-[22px] h-[28px]">
                    <Image 
                      src="/images/logo_notext.png"
                      alt="SoftCheck Logo"
                      width={28}
                      height={28}
                      className="rounded-md"
                    />
                  </div>
                  <div className="ml-3 font-medium text-[18px]">
                    Soft<span className="text-[#3b82f6]">Check</span>
                  </div>
                </div>
                
                {/* Main Menu */}
                <div className="flex-1 py-6">
                  <div className="px-3 py-2 text-xs uppercase text-gray-500 font-medium">Main</div>
                  
                  <motion.div 
                    className={`mt-2 px-3 py-2 rounded-md flex items-center cursor-pointer ${activeSection === "dashboard" ? "bg-cyan-800/30 text-cyan-400" : "text-gray-400 hover:bg-gray-800/30"}`}
                    onClick={() => handleSectionChange("dashboard")}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                    Dashboard
                  </motion.div>
                  
                  <motion.div 
                    className={`mt-2 px-3 py-2 rounded-md flex items-center cursor-pointer ${activeSection === "software" ? "bg-cyan-800/30 text-cyan-400" : "text-gray-400 hover:bg-gray-800/30"}`}
                    onClick={() => handleSectionChange("software")}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Software Database
                  </motion.div>
                  <motion.div 
                    className={`mt-2 px-3 py-2 rounded-md flex items-center cursor-pointer ${activeSection === "employees" ? "bg-cyan-800/30 text-cyan-400" : "text-gray-400 hover:bg-gray-800/30"}`}
                    onClick={() => handleSectionChange("employees")}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Employees
                  </motion.div>
                </div>
                
                {/* Settings at the bottom */}
                <div className="px-3 pb-6 pt-4 border-t border-gray-800">
                  <motion.div 
                    className={`px-3 py-2 rounded-md flex items-center cursor-not-allowed opacity-50 text-gray-400 hover:bg-transparent`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </motion.div>
                </div>
              </div>

              {/* Contenido principal */}
              <div className="flex-1 bg-gray-100 dark:bg-gray-900 flex flex-col">
                {/* Barra superior */}
                <div className="h-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    {activeSection === "dashboard" && "Dashboard"}
                    {activeSection === "software" && "Software Database"}
                    {activeSection === "license" && "License Database"}
                    {activeSection === "settings" && "Settings"}
                    {activeSection === "employees" && "Employees"}
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-500 dark:text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-medium text-sm">
                      US
                    </div>
                  </div>
                </div>
                
                {/* Contenido dinámico basado en la sección activa */}
                <div className="flex-1 p-6 overflow-auto">
                  {/* Dashboard */}
                  {activeSection === "dashboard" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-3 gap-4">
                        <motion.div 
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Softwares</div>
                          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">156</div>
                          <div className="text-xs text-green-600 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            10% since last month
                          </div>
                        </motion.div>
                        <motion.div 
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Number of Employees</div>
                          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">82</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                            Stable since last month
                          </div>
                        </motion.div>
                        <motion.div 
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                        >
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Company Risk</div>
                          <div className="text-3xl font-bold text-green-500 mb-1">Low</div>
                          <div className="text-xs flex items-center">
                            Current risk: 20%
                          </div>
                        </motion.div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <motion.div 
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <div className="flex justify-between mb-2">
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total malware blocked</div>
                          </div>
                          <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">6</div>
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              Number of malicious apps blocked
                            </div>
                            <div className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
                            </div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <div className="flex justify-between mb-2">
                            <div className="text-sm text-gray-600 dark:text-gray-400">Employees Hours Saved</div>
                          </div>
                          <div className="text-3xl font-bold text-green-500 mb-2">42 Hours</div>
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              An average of:
                            </div>
                            <div className="text-xs text-green-600 dark:text-green-400 flex items-center">
                            ∼700€ this month
                            </div>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.45 }}
                        >
                          <div className="flex justify-between mb-2">
                            <div className="text-sm text-gray-600 dark:text-gray-400">Software approved this month</div>
                            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">18</div>
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              New softwares
                            </div>
                            <div className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                              </svg>
                              25% since last month
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <div className="font-medium text-gray-800 dark:text-white">Software Vulnerability Management</div>
                          <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-full">
                            2 Critical Issues
                          </span>
                        </div>
                        <div className="space-y-2">
                          {[
                            { 
                              software: "Adobe Creative Cloud", 
                              version: "2023.4.0",
                              cve: "CVE-2023-12345",
                              severity: "Critical",
                              description: "Remote code execution vulnerability",
                              discovered: "2 hours ago",
                              status: "Not patched"
                            },
                            { 
                              software: "Brave Browser", 
                              version: "2023.4.0",
                              cve: "CVE-2023-67890",
                              severity: "Critical",
                              description: "Memory corruption vulnerability",
                              discovered: "1 day ago",
                              status: "Patch available"
                            },
                            { 
                              software: "Slack", 
                              version: "4.29.149",
                              cve: "CVE-2023-54321",
                              severity: "Medium",
                              description: "Information disclosure vulnerability",
                              discovered: "3 days ago",
                              status: "Patched"
                            }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-700">
                              <div className={`h-8 w-8 rounded-md flex items-center justify-center text-lg mr-3`}>
                                
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <div>
                                    <span className="font-medium text-gray-800 dark:text-white text-sm">{item.software}</span>
                                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">v{item.version}</span>
                                  </div>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.discovered}</span>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {item.cve} - {item.description}
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    item.status === "Not patched"
                                      ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                                      : item.status === "Patch available"
                                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                                      : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                                  }`}>
                                    {item.status}
                                  </span>
                                  {item.status !== "Patched" && (
                                    <button className="text-xs text-primary-600 dark:text-primary-400 hover:underline">
                                      Update now
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <div className="font-medium text-gray-800 dark:text-white">Recent Activity Summary</div>
                          {/*
                          <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1 text-sm">
                            <option>This week</option>
                            <option>This month</option>
                            <option>This quarter</option>
                          </select>
                          */}
                        </div>
                        <div className="space-y-2">
                          {[
                            { action: "New license added", software: "Figma Pro", user: "Sofia Muñoz", time: "2 hours ago", icon: "💡" },
                            { action: "Automatic renewal", software: "Adobe Creative Cloud", user: "System", time: "1 day ago", icon: "🔄" },
                            { action: "Software updated", software: "Obsidian", user: "Admin", time: "3 days ago", icon: "⬆️" },
                            { action: "License expired", software: "Sketch", user: "System", time: "5 days ago", icon: "⚠️" }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start p-2 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg">
                              <div className="h-8 w-8 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg mr-3">
                                {item.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-800 dark:text-white text-sm">{item.action}</span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.time}</span>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {item.software} - {item.user}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                  
                  {/* Software Database */}
                  {activeSection === "software" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between mb-6">
                        <div className="relative w-64">
                          <input 
                            type="text" 
                            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Buscar software..." 
                          />
                          <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <motion.button 
                          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md flex items-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Add Software
                        </motion.button>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Version</th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Installations</th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {softwareList.map((software, index) => (
                              <React.Fragment key={index}>
                                <motion.tr 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.05 }}
                                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                  onClick={() => toggleRowExpansion(index)}
                                >
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                    <div className="flex items-center">
                                      <span>{software.name}</span>
                                      <svg 
                                        className={`w-4 h-4 ml-2 transition-transform duration-200 ${expandedRow === index ? 'transform rotate-180' : ''}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span
                                      className={`${
                                        vulnerableSoftware[software.name]
                                          ? 'text-red-500 dark:text-red-400 cursor-pointer'
                                          : 'text-gray-500 dark:text-gray-400'
                                      }`}
                                      onMouseEnter={(e) => handleVersionMouseEnter(e, software.name)}
                                      onMouseLeave={handleVersionMouseLeave}
                                    >
                                      v{software.version}
                                      {vulnerableSoftware[software.name] && (
                                        <button
                                          onClick={(e) => handleVersionUpdate(software.name, index, e)}
                                          className="ml-2 px-2 py-0.5 text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded"
                                        >
                                          Update
                                        </button>
                                      )}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">{software.users.length}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-2">
                                      <button 
                                        onClick={(e) => handleDelete(software.name, index, e)}
                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                                      >
                                        Delete
                                      </button>
                                      <button 
                                        onClick={(e) => handleUpdate(software.name, e)}
                                        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 px-2 py-1 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20"
                                      >
                                        Update
                                      </button>
                                    </div>
                                  </td>
                                </motion.tr>
                                {expandedRow === index && (
                                  <motion.tr
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-gray-50 dark:bg-gray-800/50"
                                  >
                                    <td colSpan={4} className="px-6 py-4">
                                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Users with {software.name} installed:
                                      </div>
                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {software.users.map((user, userIndex) => (
                                          <div 
                                            key={userIndex} 
                                            className="flex items-center space-x-2 bg-white dark:bg-gray-700 px-3 py-2 rounded-md text-sm"
                                          >
                                            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white font-medium text-xs">
                                              {user.split(' ').map(name => name[0]).join('')}
                                            </div>
                                            <span className="text-gray-800 dark:text-gray-200">{user}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </td>
                                  </motion.tr>
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* License Database */}
                  {activeSection === "license" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex justify-between">
                        <div className="text-xl font-bold text-gray-800 dark:text-white">License Control</div>
                        {/*
                        <div className="flex space-x-2">
                          <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1 text-sm">
                            <option>All types</option>
                            <option>Per user</option>
                            <option>Per device</option>
                            <option>Per team</option>
                          </select>
                          <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1 text-sm">
                            <option>All dates</option>
                            <option>This month</option>
                            <option>Next renewal</option>
                            <option>Expired</option>
                          </select>
                        </div>
                        */}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <motion.div 
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-green-500"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="flex justify-between">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Active licenses</div>
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">82</div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-yellow-500"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          <div className="flex justify-between">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Next renewal</div>
                            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">14</div>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-red-500"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <div className="flex justify-between">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Scheduled cancellation</div>
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <div className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">3</div>
                        </motion.div>
                      </div>
                      
                      {/* Nueva sección de Pending Approval */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                          <div className="font-medium text-gray-800 dark:text-white">Pending Approval</div>
                          <div className="text-sm text-yellow-600 dark:text-yellow-400">
                            {pendingLicenses.length} pending requests
                          </div>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                          {pendingLicenses.map((license, index) => (
                            <motion.div 
                              key={index}
                              className="p-4 flex justify-between items-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <div>
                                <div className="font-medium text-gray-800 dark:text-white flex items-center">
                                  {license.name}
                                  <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-full">
                                    {license.type}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  Requested by {license.employee} • {license.date}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="text-lg font-medium text-gray-900 dark:text-white mr-4">
                                  {license.cost}
                                </div>
                                <button
                                  onClick={() => handleReject(index)}
                                  className="px-2 py-0.5 text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50"
                                >
                                  Reject
                                </button>
                                <button
                                  onClick={() => handleApprove(index)}
                                  className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded hover:bg-green-200 dark:hover:bg-green-900/50"
                                >
                                  Approve
                                </button>
                              </div>
                            </motion.div>
                          ))}
                          {pendingLicenses.length === 0 && (
                            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                              No pending approvals
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                          <div className="font-medium text-gray-800 dark:text-white">Upcoming renewals</div>
                          <button className="text-sm text-primary-600 dark:text-primary-400">View all</button>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                          {[
                            { name: "Adobe Creative Cloud", date: "June 15, 2023", cost: "€179,97", users: 3 },
                            { name: "Slack", date: "June 22, 2023", cost: "€26,25", users: 3 },
                            { name: "Zoom", date: "June 30, 2023", cost: "€14,99", users: 1 }
                          ].map((license, index) => (
                            <React.Fragment key={index}>
                              <motion.div 
                                className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                onClick={() => toggleLicenseRowExpansion(index)}
                              >
                                <div>
                                  <div className="font-medium text-gray-800 dark:text-white flex items-center">
                                    {license.name}
                                    <svg 
                                      className={`w-4 h-4 ml-2 transition-transform duration-200 ${expandedLicenseRow === index ? 'transform rotate-180' : ''}`} 
                                      fill="none" 
                                      stroke="currentColor" 
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">{license.users} users</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-yellow-600 dark:text-yellow-400 font-medium">{license.date}</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-300">{license.cost}</div>
                                </div>
                              </motion.div>
                              
                              {expandedLicenseRow === index && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="bg-gray-50 dark:bg-gray-800/50 p-4"
                                >
                                  <div className="text-sm font-medium text-gray-800 dark:text-white mb-3">
                                    Employees with {license.name}:
                                  </div>
                                  <div className="bg-white dark:bg-gray-700 rounded-md overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                                      <thead className="bg-gray-100 dark:bg-gray-800">
                                        <tr>
                                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Employee</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                        {findEmployeesWithSoftware(license.name).map((employee, empIndex) => (
                                          <tr key={empIndex} className="text-sm">
                                            <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                                              <div className="flex items-center">
                                                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium text-xs mr-2">
                                                  {employee.name.split(' ').map(name => name[0]).join('')}
                                                </div>
                                                {employee.name}
                                              </div>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </motion.div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Employees Database */}
                  {activeSection === "employees" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between mb-6">
                        <div className="relative w-64">
                          <input 
                            type="text" 
                            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Buscar empleado..." 
                          />
                          <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <motion.button 
                          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md flex items-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add Employee
                        </motion.button>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee Name</th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Number of installed softwares</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {employeesList.map((employee, index) => (
                              <React.Fragment key={index}>
                                <motion.tr 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.05 }}
                                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                  onClick={() => toggleEmployeeRowExpansion(index)}
                                >
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                    <div className="flex items-center">
                                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm mr-3">
                                        {employee.name.split(' ').map(name => name[0]).join('')}
                                      </div>
                                      <span>{employee.name}</span>
                                      <svg 
                                        className={`w-4 h-4 ml-2 transition-transform duration-200 ${expandedEmployeeRow === index ? 'transform rotate-180' : ''}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                                    {employee.software.length}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                      employee.active 
                                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                                        : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                                    }`}>
                                      {employee.active ? "Active" : "Inactive"}
                                    </span>
                                  </td>
                                </motion.tr>
                                {expandedEmployeeRow === index && (
                                  <motion.tr
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-gray-50 dark:bg-gray-800/50"
                                  >
                                    <td colSpan={3} className="px-6 py-4">
                                      <div className="space-y-4">
                                        <div>
                                          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                            Installed software:
                                          </div>
                                          <div className="bg-white dark:bg-gray-700 rounded-md overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                                              <thead className="bg-gray-100 dark:bg-gray-800">
                                                <tr>
                                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Software</th>
                                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Version</th>
                                                </tr>
                                              </thead>
                                              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                                {employee.software.map((sw, swIndex) => (
                                                  <tr key={swIndex} className="text-sm">
                                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{sw.name}</td>
                                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{sw.version}</td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </motion.tr>
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Settings */}
                  {activeSection === "settings" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="p-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      Settings are currently not available
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <motion.button
              onClick={() => openContactForm("Demo")}
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Request a trial
            </motion.button>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltipPosition && (
        <div
          className="fixed z-50 px-4 py-2 text-sm text-white bg-red-600 rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y - 10
          }}
        >
          This software has an active vulnerability. Please, update.
        </div>
      )}
    </section>
  );
};

export default PlatformLook;