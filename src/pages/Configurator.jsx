import React, { useState } from 'react';
import '../App.css';
import linuxLogo from '../assets/logos/linux.png';
import windowsLogo from '../assets/logos/windows.png';
import awsLogo from '../assets/logos/aws.png';
import { v4 as uuidv4 } from 'uuid';

function Configurator({ addOrder }) {
  const instanceOptions = [
    { name: 't2.micro', vCPUs: 1, RAM: 1 },
    { name: 't3.small', vCPUs: 2, RAM: 2 },
    { name: 't3.medium', vCPUs: 2, RAM: 4 },
    { name: 't3.large', vCPUs: 2, RAM: 8 },
    { name: 'm5.large', vCPUs: 2, RAM: 8 },
    { name: 'm5.xlarge', vCPUs: 4, RAM: 16 },
    { name: 'c5.large', vCPUs: 2, RAM: 4 },
    { name: 'c5.xlarge', vCPUs: 4, RAM: 8 }
  ];

  const validCPUs = [1, 2, 4];
  const validRAMs = [1, 2, 4, 8, 16];

  const [selectedInstance, setSelectedInstance] = useState(instanceOptions[0]);
  const [storage, setStorage] = useState(30); // Default to 30 GB
  const [selectedOSKleinster, setSelectedOSKleinster] = useState('Linux');
  const [selectedOSGroesster, setSelectedOSGroesster] = useState('Linux');
  const [selectedOSKonfigurator, setSelectedOSKonfigurator] = useState('Linux');
  const [selectedOSVersionKleinster, setSelectedOSVersionKleinster] = useState('');
  const [selectedOSVersionGroesster, setSelectedOSVersionGroesster] = useState('');
  const [selectedOSVersionKonfigurator, setSelectedOSVersionKonfigurator] = useState('');
  const [errorKleinster, setErrorKleinster] = useState('');
  const [errorGroesster, setErrorGroesster] = useState('');
  const [errorKonfigurator, setErrorKonfigurator] = useState('');

  const handleOrder = (instanceType, os, osVersion, setError) => {
    if (!osVersion) {
      setError('Bitte wählen Sie eine Betriebssystemversion aus!');
      return;
    }

    const orderId = uuidv4();
    const fileName = `${orderId}.tf`;

    const orderData = { instanceType, os, osVersion, storage, fileName };
    addOrder(orderData);
    setError('');
  };

  const handleCPUChange = (event) => {
    const selectedCPU = parseInt(event.target.value);
    const filteredInstances = instanceOptions.filter(instance => instance.vCPUs === selectedCPU && validCPUs.includes(selectedCPU));
    if (filteredInstances.length > 0) {
      setSelectedInstance(filteredInstances.find(instance => instance.RAM === selectedInstance.RAM) || filteredInstances[0]);
    }
  };

  const handleRAMChange = (event) => {
    const selectedRAM = parseInt(event.target.value);
    const filteredInstance = instanceOptions.find(instance => instance.RAM === selectedRAM && validRAMs.includes(selectedRAM) && instance.vCPUs === selectedInstance.vCPUs);
    if (filteredInstance) {
      setSelectedInstance(filteredInstance);
    }
  };

  const handleOSKleinsterChange = (event) => {
    setSelectedOSKleinster(event.target.value);
    setSelectedOSVersionKleinster(''); // Zurücksetzen der Version bei Betriebssystemänderung
  };

  const handleOSGroessterChange = (event) => {
    setSelectedOSGroesster(event.target.value);
    setSelectedOSVersionGroesster(''); // Zurücksetzen der Version bei Betriebssystemänderung
  };

  const handleOSKonfiguratorChange = (event) => {
    setSelectedOSKonfigurator(event.target.value);
    setSelectedOSVersionKonfigurator(''); // Zurücksetzen der Version bei Betriebssystemänderung
  };

  const handleOSVersionKleinsterChange = (event) => {
    setSelectedOSVersionKleinster(event.target.value);
  };

  const handleOSVersionGroessterChange = (event) => {
    setSelectedOSVersionGroesster(event.target.value);
  };

  const handleOSVersionKonfiguratorChange = (event) => {
    setSelectedOSVersionKonfigurator(event.target.value);
  };

  const osVersions = {
    Linux: ['Ubuntu 20.04 LTS', 'Red Hat Enterprise Linux 8', 'Debian 10', 'SUSE Linux Enterprise Server 15 SP5', 'Amazon Linux 2'],
    Windows: ['Windows Server 2016', 'Windows Server 2019', 'Windows Server 2022']
  };

  return (
    <div className="container">
      <header className="header">
        <h3>vServer</h3>
      </header>
      <main className="configurator">
        <div className="row">
          <div className="col">
            <div className="server-frame centered">
              <h4>vServer - min</h4>
              <div className="preconfigured-server no-background">
                <p>Instanztyp: t2.micro</p>
                <p>CPU: 1 Kern(e)</p>
                <p>RAM: 1 GB</p>
                <p>Speicher: 30 GB</p>
                <div className="os-selection">
                  <label>
                    <input
                      type="radio"
                      value="Linux"
                      checked={selectedOSKleinster === 'Linux'}
                      onChange={handleOSKleinsterChange}
                    />
                    <img src={linuxLogo} alt="Linux Logo" />
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Windows"
                      checked={selectedOSKleinster === 'Windows'}
                      onChange={handleOSKleinsterChange}
                    />
                    <img src={windowsLogo} alt="Windows Logo" />
                  </label>
                </div>
                {selectedOSKleinster && (
                  <div className="os-version-selection">
                    <label htmlFor="os-version-kleinster">Betriebssystemversion:</label>
                    <select id="os-version-kleinster" value={selectedOSVersionKleinster} onChange={handleOSVersionKleinsterChange}>
                      <option value="">Bitte wählen</option>
                      {osVersions[selectedOSKleinster].map(version => (
                        <option key={version} value={version}>{version}</option>
                      ))}
                    </select>
                  </div>
                )}
                {errorKleinster && <p className="error-message">{errorKleinster}</p>}
                <div className="summary">
                  <h4>Konfiguration:</h4>
                  <p><img src={awsLogo} alt="AWS Logo" className="aws-logo" />Instanztyp: t2.micro</p>
                  <hr />
                  <p>CPU: 1 Kern(e)</p>
                  <hr />
                  <p>RAM: 1 GB</p>
                  <hr />
                  <p>Speicher: 30 GB SSD</p>
                  <hr />
                  <p>Betriebssystem: {selectedOSKleinster}</p>
                  <hr />
                  {selectedOSVersionKleinster && <p>Betriebssystemversion: {selectedOSVersionKleinster}</p>}
                </div>
                <div className="button-container">
                  <button className="order-button" onClick={() => handleOrder('t2.micro', selectedOSKleinster, selectedOSVersionKleinster, setErrorKleinster)}>In den Warenkorb</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="server-frame centered">
              <h4>vServer Konfigurator</h4>
              <div className="preconfigured-server no-background">
                <div className="slider-container">
                  <label htmlFor="cpu-slider">CPU (Kerne): {selectedInstance.vCPUs}</label>
                  <input
                    type="range"
                    id="cpu-slider"
                    min="1"
                    max="4"
                    value={selectedInstance.vCPUs}
                    onChange={handleCPUChange}
                    className="slider"
                  />
                </div>
                <div className="slider-container">
                  <label htmlFor="ram-slider">RAM (GB): {selectedInstance.RAM}</label>
                  <input
                    type="range"
                    id="ram-slider"
                    min="1"
                    max="16"
                    value={selectedInstance.RAM}
                    onChange={handleRAMChange}
                    className="slider"
                  />
                </div>
                <div className="slider-container">
                  <label htmlFor="storage-slider">Speicher (GB): {storage}</label>
                  <input
                    type="range"
                    id="storage-slider"
                    min="100"
                    max="1000"
                    step="100"
                    value={storage}
                    onChange={(e) => setStorage(e.target.value)}
                    className="slider"
                  />
                </div>
                <div className="os-selection">
                  <label>
                    <input
                      type="radio"
                      value="Linux"
                      checked={selectedOSKonfigurator === 'Linux'}
                      onChange={handleOSKonfiguratorChange}
                    />
                    <img src={linuxLogo} alt="Linux Logo" />
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Windows"
                      checked={selectedOSKonfigurator === 'Windows'}
                      onChange={handleOSKonfiguratorChange}
                    />
                    <img src={windowsLogo} alt="Windows Logo" />
                  </label>
                </div>
                {selectedOSKonfigurator && (
                  <div className="os-version-selection">
                    <label htmlFor="os-version-konfigurator">Betriebssystemversion:</label>
                    <select id="os-version-konfigurator" value={selectedOSVersionKonfigurator} onChange={handleOSVersionKonfiguratorChange}>
                      <option value="">Bitte wählen</option>
                      {osVersions[selectedOSKonfigurator].map(version => (
                        <option key={version} value={version}>{version}</option>
                      ))}
                    </select>
                  </div>
                )}
                {errorKonfigurator && <p className="error-message">{errorKonfigurator}</p>}
                <div className="summary">
                  <h4>Konfiguration:</h4>
                  <p><img src={awsLogo} alt="AWS Logo" className="aws-logo" />Instanztyp: {selectedInstance.name}</p>
                  <hr />
                  <p>CPU: {selectedInstance.vCPUs} Kern(e)</p>
                  <hr />
                  <p>RAM: {selectedInstance.RAM} GB</p>
                  <hr />
                  <p>Speicher: {storage} GB SSD</p>
                  <hr />
                  <p>Betriebssystem: {selectedOSKonfigurator}</p>
                  <hr />
                  {selectedOSVersionKonfigurator && <p>Betriebssystemversion: {selectedOSVersionKonfigurator}</p>}
                </div>
                <div className="button-container">
                  <button className="order-button" onClick={() => handleOrder(selectedInstance.name, selectedOSKonfigurator, selectedOSVersionKonfigurator, setErrorKonfigurator)}>In den Warenkorb</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="server-frame centered">
              <h4>vServer - max</h4>
              <div className="preconfigured-server no-background">
                <p>Instanztyp: c5.xlarge</p>
                <p>CPU: 4 Kerne</p>
                <p>RAM: 8 GB</p>
                <p>Speicher: 1000 GB</p>
                <div className="os-selection">
                  <label>
                    <input
                      type="radio"
                      value="Linux"
                      checked={selectedOSGroesster === 'Linux'}
                      onChange={handleOSGroessterChange}
                    />
                    <img src={linuxLogo} alt="Linux Logo" />
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Windows"
                      checked={selectedOSGroesster === 'Windows'}
                      onChange={handleOSGroessterChange}
                    />
                    <img src={windowsLogo} alt="Windows Logo" />
                  </label>
                </div>
                {selectedOSGroesster && (
                  <div className="os-version-selection">
                    <label htmlFor="os-version-groesster">Betriebssystemversion:</label>
                    <select id="os-version-groesster" value={selectedOSVersionGroesster} onChange={handleOSVersionGroessterChange}>
                      <option value="">Bitte wählen</option>
                      {osVersions[selectedOSGroesster].map(version => (
                        <option key={version} value={version}>{version}</option>
                      ))}
                    </select>
                  </div>
                )}
                {errorGroesster && <p className="error-message">{errorGroesster}</p>}
                <div className="summary">
                  <h4>Konfiguration:</h4>
                  <p><img src={awsLogo} alt="AWS Logo" className="aws-logo" />Instanztyp: c5.xlarge</p>
                  <hr />
                  <p>CPU: 4 Kerne</p>
                  <hr />
                  <p>RAM: 8 GB</p>
                  <hr />
                  <p>Speicher: 1000 GB SSD</p>
                  <hr />
                  <p>Betriebssystem: {selectedOSGroesster}</p>
                  <hr />
                  {selectedOSVersionGroesster && <p>Betriebssystemversion: {selectedOSVersionGroesster}</p>}
                </div>
                <div className="button-container">
                  <button className="order-button" onClick={() => handleOrder('c5.xlarge', selectedOSGroesster, selectedOSVersionGroesster, setErrorGroesster)}>In den Warenkorb</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Configurator;
