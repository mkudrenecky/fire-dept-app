defmodule Server.Repo.Migrations.CreateScbaForms do
  use Ecto.Migration

  def change do
    create table(:scba_forms) do
      add :name, :string
      add :unit_number, :integer
      add :date, :naive_datetime
      add :lights_working, :boolean, default: false, null: false
      add :bottle_full, :boolean, default: false, null: false
      add :straps_extended, :boolean, default: false, null: false
      add :clean, :boolean, default: false, null: false
      add :damage, :boolean, default: false, null: false
      add :complete, :boolean, default: false, null: false

      timestamps(type: :utc_datetime)
    end
  end
end
