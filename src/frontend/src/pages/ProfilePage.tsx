import {
  Briefcase,
  Edit2,
  Globe,
  Mail,
  MapPin,
  Plus,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { OPEN_ROLES, TEAM_MEMBERS } from "../data/mockData";

type Role = {
  id: string;
  title: string;
  department: string;
  location: string;
  applicants: number;
  posted: string;
};
type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  joined: string;
  email: string;
};

function EditProfileModal({
  info,
  onSave,
  onClose,
}: {
  info: {
    name: string;
    industry: string;
    location: string;
    website: string;
    size: string;
    founded: string;
  };
  onSave: (data: typeof info) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(info);
  const set = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6"
        data-ocid="profile.edit.modal"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-gray-900">Edit Company Profile</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {(
            [
              ["Company Name", "name"],
              ["Industry", "industry"],
              ["Location", "location"],
              ["Website", "website"],
              ["Company Size", "size"],
              ["Founded Year", "founded"],
            ] as [string, keyof typeof form][]
          ).map(([label, key]) => (
            <div key={key}>
              <label
                htmlFor={`ep-${String(key)}`}
                className="text-xs font-semibold text-gray-500 block mb-1"
              >
                {label}
              </label>
              <input
                id={`ep-${String(key)}`}
                type="text"
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-300 transition"
                data-ocid={`profile.edit.${key}.input`}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2 rounded-xl hover:bg-gray-50 transition"
            data-ocid="profile.edit.cancel_button"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSave(form);
              onClose();
            }}
            className="flex-1 gradient-btn text-sm font-semibold py-2 rounded-xl"
            data-ocid="profile.edit.save_button"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function AddRoleModal({
  onAdd,
  onClose,
}: {
  onAdd: (role: Omit<Role, "id" | "applicants" | "posted">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ title: "", department: "", location: "" });
  const valid = form.title.trim() && form.department.trim();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        data-ocid="profile.add_role.modal"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-gray-900">Post New Role</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {(["title", "department", "location"] as const).map((k) => (
            <div key={k}>
              <label
                htmlFor={`ar-${k}`}
                className="text-xs font-semibold text-gray-500 block mb-1 capitalize"
              >
                {k}
              </label>
              <input
                id={`ar-${k}`}
                type="text"
                value={form[k]}
                onChange={(e) =>
                  setForm((p) => ({ ...p, [k]: e.target.value }))
                }
                placeholder={
                  k === "title"
                    ? "e.g. Senior Engineer"
                    : k === "department"
                      ? "e.g. Engineering"
                      : "e.g. Bangalore / Remote"
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-300 transition"
                data-ocid={`profile.add_role.${k}.input`}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2 rounded-xl"
            data-ocid="profile.add_role.cancel_button"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!valid}
            onClick={() => {
              if (valid) {
                onAdd(form);
                onClose();
              }
            }}
            className="flex-1 gradient-btn text-sm font-semibold py-2 rounded-xl disabled:opacity-40"
            data-ocid="profile.add_role.submit_button"
          >
            Post Role
          </button>
        </div>
      </div>
    </div>
  );
}

function AddMemberModal({
  onAdd,
  onClose,
}: {
  onAdd: (m: Omit<TeamMember, "id" | "joined">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    avatar: "",
  });
  const valid = form.name.trim() && form.role.trim();
  const autoAvatar = form.name.trim().slice(0, 2).toUpperCase() || "??";
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        data-ocid="profile.add_member.modal"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-gray-900">Add Team Member</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {(["name", "role", "email"] as const).map((k) => (
            <div key={k}>
              <label
                htmlFor={`am-${k}`}
                className="text-xs font-semibold text-gray-500 block mb-1 capitalize"
              >
                {k}
              </label>
              <input
                id={`am-${k}`}
                type={k === "email" ? "email" : "text"}
                value={form[k]}
                onChange={(e) =>
                  setForm((p) => ({ ...p, [k]: e.target.value }))
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-indigo-300 transition"
                data-ocid={`profile.add_member.${k}.input`}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2 rounded-xl"
            data-ocid="profile.add_member.cancel_button"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!valid}
            onClick={() => {
              if (valid) {
                onAdd({
                  name: form.name.trim(),
                  role: form.role.trim(),
                  email: form.email.trim(),
                  avatar: autoAvatar,
                });
                onClose();
              }
            }}
            className="flex-1 gradient-btn text-sm font-semibold py-2 rounded-xl disabled:opacity-40"
            data-ocid="profile.add_member.submit_button"
          >
            Add Member
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [about, setAbout] = useState(
    "TechCorp Solutions is a leading technology company specializing in enterprise SaaS products. We are on a mission to build world-class software that empowers businesses globally. Founded in 2015, we have a team of 500+ talented professionals across India and beyond.",
  );
  const [editingAbout, setEditingAbout] = useState(false);
  const [roles, setRoles] = useState<Role[]>(OPEN_ROLES);
  const [team, setTeam] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [companyInfo, setCompanyInfo] = useState({
    name: "TechCorp Solutions",
    industry: "Enterprise SaaS",
    location: "Bangalore, India",
    website: "techcorp.io",
    size: "500–1,000 employees",
    founded: "2015",
  });

  const deleteRole = (id: string) =>
    setRoles((prev) => prev.filter((r) => r.id !== id));
  const removeMember = (id: string) =>
    setTeam((prev) => prev.filter((m) => m.id !== id));

  const addRole = (data: Omit<Role, "id" | "applicants" | "posted">) => {
    const newRole: Role = {
      ...data,
      id: `r_${Date.now()}`,
      applicants: 0,
      posted: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setRoles((prev) => [...prev, newRole]);
  };

  const addMember = (m: Omit<TeamMember, "id" | "joined">) => {
    setTeam((prev) => [
      ...prev,
      {
        ...m,
        id: `t_${Date.now()}`,
        joined: new Date().toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
      },
    ]);
  };

  return (
    <>
      {showEditProfile && (
        <EditProfileModal
          info={companyInfo}
          onSave={setCompanyInfo}
          onClose={() => setShowEditProfile(false)}
        />
      )}
      {showAddRole && (
        <AddRoleModal onAdd={addRole} onClose={() => setShowAddRole(false)} />
      )}
      {showAddMember && (
        <AddMemberModal
          onAdd={addMember}
          onClose={() => setShowAddMember(false)}
        />
      )}

      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Company Profile</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your company presence and open roles
          </p>
        </div>

        {/* Company header */}
        <div className="glass-card p-6 flex items-start gap-5">
          <img
            src="/assets/generated/techcorp-logo.dim_80x80.png"
            alt="TechCorp Logo"
            className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-gray-200"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {companyInfo.name}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Briefcase size={13} /> {companyInfo.industry}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {companyInfo.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe size={13} /> {companyInfo.website}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={13} /> {companyInfo.size}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowEditProfile(true)}
                className="gradient-btn text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5"
                data-ocid="profile.edit.button"
              >
                <Edit2 size={13} /> Edit Profile
              </button>
            </div>
            {/* Stats */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
              {[
                { label: "Total Hires", value: "128" },
                { label: "Active Postings", value: String(roles.length) },
                { label: "Avg Time-to-Hire", value: "18 days" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-lg font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">About</h3>
            <button
              type="button"
              onClick={() => setEditingAbout(!editingAbout)}
              className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition"
              data-ocid="profile.about.edit_button"
            >
              <Edit2 size={12} /> {editingAbout ? "Save" : "Edit"}
            </button>
          </div>
          {editingAbout ? (
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none resize-none focus:border-indigo-300 transition"
              data-ocid="profile.about.textarea"
            />
          ) : (
            <p className="text-sm text-gray-500 leading-relaxed">{about}</p>
          )}
        </div>

        {/* Open Roles */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Open Roles</h3>
            <button
              type="button"
              onClick={() => setShowAddRole(true)}
              className="flex items-center gap-1.5 text-xs gradient-btn px-3 py-1.5 rounded-lg font-semibold"
              data-ocid="profile.add_role.button"
            >
              <Plus size={12} /> Post New Role
            </button>
          </div>
          <div className="space-y-3" data-ocid="profile.roles.list">
            {roles.length === 0 && (
              <p
                className="text-sm text-gray-400 text-center py-8"
                data-ocid="profile.roles.empty_state"
              >
                No open roles. Click "Post New Role" to add one.
              </p>
            )}
            {roles.map((role, i) => (
              <div
                key={role.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200"
                data-ocid={`profile.role.item.${i + 1}`}
              >
                {editingRoleId === role.id ? (
                  <input
                    type="text"
                    defaultValue={role.title}
                    onBlur={(e) => {
                      setRoles((prev) =>
                        prev.map((r) =>
                          r.id === role.id
                            ? { ...r, title: e.target.value }
                            : r,
                        ),
                      );
                      setEditingRoleId(null);
                    }}
                    className="flex-1 bg-white border border-indigo-300 rounded-lg px-2 py-1 text-sm outline-none mr-4"
                  />
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {role.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                      <span>{role.department}</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={10} />
                        {role.location}
                      </span>
                      <span>{role.applicants} applicants</span>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingRoleId(role.id)}
                    className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition"
                    data-ocid={`profile.role.edit_button.${i + 1}`}
                  >
                    <Edit2 size={12} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteRole(role.id)}
                    className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 transition"
                    data-ocid={`profile.role.delete_button.${i + 1}`}
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Team Members</h3>
            <button
              type="button"
              onClick={() => setShowAddMember(true)}
              className="flex items-center gap-1.5 text-xs gradient-btn px-3 py-1.5 rounded-lg font-semibold"
              data-ocid="profile.add_member.button"
            >
              <Plus size={12} /> Add Member
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3" data-ocid="profile.team.list">
            {team.map((member, i) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 group"
                data-ocid={`profile.team.item.${i + 1}`}
              >
                <div className="w-10 h-10 rounded-full gradient-active flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-white">
                    {member.avatar}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1 truncate">
                    <Mail size={9} /> {member.email}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeMember(member.id)}
                  className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-50 rounded-lg"
                  title="Remove member"
                  data-ocid={`profile.team.delete_button.${i + 1}`}
                >
                  <Trash2 size={13} className="text-red-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
