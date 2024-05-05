defmodule Server.Forms.SCBAForm do
  use Ecto.Schema
  import Ecto.Changeset

  schema "scba_forms" do
    field :complete, :boolean, default: false
    field :name, :string
    field :date, :naive_datetime
    field :clean, :boolean, default: false
    field :unit_number, :integer
    field :lights_working, :boolean, default: false
    field :bottle_full, :boolean, default: false
    field :straps_extended, :boolean, default: false
    field :damage, :boolean, default: false

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(scba_form, attrs) do
    scba_form
    |> cast(attrs, [:name, :unit_number, :date, :lights_working, :bottle_full, :straps_extended, :clean, :damage, :complete])
    |> validate_required([:name, :unit_number, :date, :lights_working, :bottle_full, :straps_extended, :clean, :damage, :complete])
  end
end
