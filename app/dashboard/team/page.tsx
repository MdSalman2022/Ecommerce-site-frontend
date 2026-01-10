'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { UserPlus, Mail, Shield, ShieldCheck, Trash2, RefreshCw, Check, X, Send } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

interface TeamMember {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'moderator';
    avatar?: string;
    createdAt: string;
    lastLogin?: string;
}

interface Invitation {
    _id: string;
    email: string;
    role: 'admin' | 'moderator';
    status: string;
    createdAt: string;
    expiresAt: string;
    invitedBy: { name: string; email: string };
}

interface Permission {
    key: string;
    name: string;
    granted: boolean;
}

interface RolePermissions {
    description: string;
    permissions: Permission[];
}

export default function TeamPage() {
    const { user } = useAuth();
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [invitations, setInvitations] = useState<Invitation[]>([]);
    const [permissions, setPermissions] = useState<Record<string, RolePermissions>>({});
    const [loading, setLoading] = useState(true);
    const [inviteOpen, setInviteOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState<'admin' | 'moderator'>('moderator');
    const [inviting, setInviting] = useState(false);
    const [resendingId, setResendingId] = useState<string | null>(null);

    const isAdmin = user?.role === 'admin';

    const fetchData = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        try {
            const [membersRes, permissionsRes] = await Promise.all([
                fetch(`${API_URL}/api/team/members`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch(`${API_URL}/api/team/permissions`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            if (membersRes.ok) {
                const data = await membersRes.json();
                setMembers(data.data.members);
            }

            if (permissionsRes.ok) {
                const data = await permissionsRes.json();
                setPermissions(data.data.permissions);
            }

            // Only admins can see pending invitations
            if (isAdmin) {
                const invitationsRes = await fetch(`${API_URL}/api/team/invitations`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (invitationsRes.ok) {
                    const data = await invitationsRes.json();
                    setInvitations(data.data.invitations);
                }
            }
        } catch (error) {
            console.error('Failed to fetch team data:', error);
            toast.error('Failed to load team data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [isAdmin]);

    const handleInvite = async () => {
        if (!inviteEmail) {
            toast.error('Please enter an email address');
            return;
        }

        setInviting(true);
        const token = localStorage.getItem('accessToken');

        try {
            const res = await fetch(`${API_URL}/api/team/invite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Invitation sent successfully!');
                setInviteEmail('');
                setInviteOpen(false);
                fetchData();
            } else {
                toast.error(data.message || 'Failed to send invitation');
            }
        } catch (error) {
            toast.error('Failed to send invitation');
        } finally {
            setInviting(false);
        }
    };

    const handleCancelInvitation = async (id: string) => {
        const token = localStorage.getItem('accessToken');

        try {
            const res = await fetch(`${API_URL}/api/team/invite/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                toast.success('Invitation cancelled');
                fetchData();
            } else {
                toast.error('Failed to cancel invitation');
            }
        } catch (error) {
            toast.error('Failed to cancel invitation');
        }
    };

    const handleResendInvitation = async (id: string) => {
        setResendingId(id);
        const token = localStorage.getItem('accessToken');

        try {
            const res = await fetch(`${API_URL}/api/team/invite/${id}/resend`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Invitation resent successfully!');
                fetchData();
            } else {
                toast.error(data.message || 'Failed to resend invitation');
            }
        } catch (error) {
            toast.error('Failed to resend invitation');
        } finally {
            setResendingId(null);
        }
    };

    const handleUpdateRole = async (memberId: string, newRole: string) => {
        const token = localStorage.getItem('accessToken');

        try {
            const res = await fetch(`${API_URL}/api/team/members/${memberId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role: newRole }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(`Role updated to ${newRole}`);
                fetchData();
            } else {
                toast.error(data.message || 'Failed to update role');
            }
        } catch (error) {
            toast.error('Failed to update role');
        }
    };

    const handleRemoveMember = async (memberId: string) => {
        if (!confirm('Are you sure you want to remove this member from the team?')) return;

        const token = localStorage.getItem('accessToken');

        try {
            const res = await fetch(`${API_URL}/api/team/members/${memberId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Member removed from team');
                fetchData();
            } else {
                toast.error(data.message || 'Failed to remove member');
            }
        } catch (error) {
            toast.error('Failed to remove member');
        }
    };

    const getRoleBadgeColor = (role: string) => {
        return role === 'admin' 
            ? 'bg-purple-100 text-purple-700' 
            : 'bg-blue-100 text-blue-700';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-semibold">Team Management</h2>
                    <p className="text-sm text-gray-500">Manage your team members and their permissions</p>
                </div>
                
                {isAdmin && (
                    <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
                        <DialogTrigger asChild>
                            <Button className="gap-2">
                                <UserPlus className="h-4 w-4" />
                                Invite Member
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Invite Team Member</DialogTitle>
                                <DialogDescription>
                                    Send an invitation email to add a new team member.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="email"
                                            placeholder="member@example.com"
                                            value={inviteEmail}
                                            onChange={(e) => setInviteEmail(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Role</label>
                                    <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as 'admin' | 'moderator')}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="moderator">
                                                <div className="flex items-center gap-2">
                                                    <Shield className="h-4 w-4 text-blue-500" />
                                                    Moderator
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="admin">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck className="h-4 w-4 text-purple-500" />
                                                    Admin
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setInviteOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleInvite} disabled={inviting}>
                                    {inviting ? 'Sending...' : 'Send Invitation'}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            {/* Team Members Table */}
            <div className="bg-white rounded-lg border overflow-hidden">
                <div className="px-4 py-3 border-b bg-gray-50">
                    <h3 className="font-medium">Team Members ({members.length})</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 text-sm text-gray-600">
                            <tr>
                                <th className="text-left px-4 py-3">Member</th>
                                <th className="text-left px-4 py-3">Role</th>
                                <th className="text-left px-4 py-3 hidden md:table-cell">Joined</th>
                                {isAdmin && <th className="text-right px-4 py-3">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {members.map((member) => (
                                <tr key={member._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary">
                                                {member.name?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{member.name}</p>
                                                <p className="text-sm text-gray-500">{member.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(member.role)}`}>
                                            {member.role === 'admin' ? (
                                                <>
                                                    <ShieldCheck className="h-3.5 w-3.5" />
                                                    Admin
                                                </>
                                            ) : (
                                                <>
                                                    <Shield className="h-3.5 w-3.5" />
                                                    Moderator
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell text-sm text-gray-500">
                                        {new Date(member.createdAt).toLocaleDateString()}
                                    </td>
                                    {isAdmin && (
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-2">
                                                {member._id !== user?._id && (
                                                    <>
                                                        <Select
                                                            value={member.role}
                                                            onValueChange={(v) => handleUpdateRole(member._id, v)}
                                                        >
                                                            <SelectTrigger className="w-32 h-8 text-xs">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="admin">Admin</SelectItem>
                                                                <SelectItem value="moderator">Moderator</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                            onClick={() => handleRemoveMember(member._id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </>
                                                )}
                                                {member._id === user?._id && (
                                                    <span className="text-xs text-gray-400">You</span>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pending Invitations */}
            {isAdmin && invitations.length > 0 && (
                <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="px-4 py-3 border-b bg-amber-50">
                        <h3 className="font-medium text-amber-700">Pending Invitations ({invitations.length})</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 text-sm text-gray-600">
                                <tr>
                                    <th className="text-left px-4 py-3">Email</th>
                                    <th className="text-left px-4 py-3">Role</th>
                                    <th className="text-left px-4 py-3 hidden md:table-cell">Expires</th>
                                    <th className="text-right px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {invitations.map((inv) => (
                                    <tr key={inv._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <p className="font-medium">{inv.email}</p>
                                            <p className="text-xs text-gray-500">
                                                Invited by {inv.invitedBy?.name || 'Admin'}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(inv.role)}`}>
                                                {inv.role.charAt(0).toUpperCase() + inv.role.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 hidden md:table-cell text-sm text-gray-500">
                                            {new Date(inv.expiresAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-primary hover:text-primary/80 hover:bg-primary/10"
                                                    onClick={() => handleResendInvitation(inv._id)}
                                                    disabled={resendingId === inv._id}
                                                >
                                                    {resendingId === inv._id ? (
                                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <>
                                                            <Send className="h-4 w-4 mr-1" />
                                                            Resend
                                                        </>
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => handleCancelInvitation(inv._id)}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
 
            <div className="bg-white rounded-lg border overflow-hidden">
                <Accordion type="single" collapsible>
                    <AccordionItem value="permissions" className="border-none">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                <span className="font-medium">Role Permissions Reference</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                {Object.entries(permissions).map(([role, data]) => (
                                    <div key={role} className="border rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            {role === 'admin' ? (
                                                <ShieldCheck className="h-5 w-5 text-purple-500" />
                                            ) : (
                                                <Shield className="h-5 w-5 text-blue-500" />
                                            )}
                                            <h4 className="font-semibold capitalize">{role}</h4>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-3">{data.description}</p>
                                        <div className="space-y-1">
                                            {data.permissions.map((perm) => (
                                                <div key={perm.key} className="flex items-center gap-2 text-sm">
                                                    {perm.granted ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <X className="h-4 w-4 text-gray-300" />
                                                    )}
                                                    <span className={perm.granted ? 'text-gray-700' : 'text-gray-400'}>
                                                        {perm.name.replace(/_/g, ' ').replace(/:/g, ': ')}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
