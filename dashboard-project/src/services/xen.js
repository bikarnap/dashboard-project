import axios from 'axios';

const xenService = {
    getPools: async () => {
        try {
            const response = await axios.get('http://<xen_server_ip>/api/v0/pools')
            return response.data || []
        } catch (error) {
            console.error('Failed to get pools', error);
            throw error;
        }
    },
    getVMs: async (host) => {
        try {
            const response = await axios.get(`http://<xen_server_ip>/api/v0/vms/${host}`);
            return response.data || [];
        } catch (error) {
            console.error('Failed to get VMs', error);
            throw error;
        }
    },

    getRunningVMs: async (host) => {
        try {
            const response = await axios.get(`http://<xen_server_ip>/api/v0/vms/${host}/?power_state=Running`);
            return response.data || [];
        } catch (error) {
            console.error('Failed to get VMs', error);
            throw error;
        }
    },

    getHaltedVMs: async (host) => {
        try {
            const response = await axios.get(`http://<xen_server_ip>/api/v0/vms/${host}/?power_state=Halted`);
            return response.data || [];
        } catch (error) {
            console.error('Failed to get VMs', error);
            throw error;
        }
    }
};

export default xenService;